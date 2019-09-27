const server = require('../index');
const cloneDeep = require('lodash.clonedeep');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const handleError = require('../routes/errorHandler');
chai.use(chaiHttp);

const Booking = require('../models/booking');
const Room = require('../models/room');

// temporary sign with jwt
const jwt = require('jsonwebtoken');
const createToken = booking => {
  return jwt.sign(booking, process.env.API_KEY);
};

describe('Bookings', () => {
  const booking = {
    userId: process.env.DUMMY_USER_ID,
    room: '305',
    start: new Date(2019, 9, 20, 8),
    end: new Date(2019, 9, 20, 9)
  };

  before(done => {
    Booking.deleteMany({}, error => {
      if (error) return done();
    });
    Room.findOne({ roomName: booking.room }, (error, foundRoom) => {
      if (error) return done();
      const index = foundRoom.hoursBooked.indexOf(booking.start.toString());
      if (index > -1) foundRoom.hoursBooked.splice(index, 1);
      Room.findOneAndUpdate(
        { roomName: booking.room },
        foundRoom,
        { useFindAndModify: false },
        error => {
          done();
        }
      );
    });
  });

  describe('/POST create booking and add to rooms', () => {
    it('should return saved booking and saved room', done => {
      const token = createToken(booking);
      chai
        .request(server)
        .post('/booking/create')
        .send({ token })
        .end((error, res) => {
          if (error) return done(error);
          res.should.have.status(201);
          res.body.should.have.keys('savedBooking', 'savedRoom');
          const savedBooking = res.body.savedBooking,
            savedRoom = res.body.savedRoom;
          savedBooking.should.be
            .a('object')
            .that.include.all.keys('room', 'start', 'end');
          savedRoom.should.be.a('object').that.have.property('hoursBooked');
          expect(savedRoom.hoursBooked)
            .to.be.an('array')
            .that.includes(savedBooking.start);
          done();
        });
    });
  });

  describe('/POST create invalid booking', () => {
    itTestsBadBooking(booking, 'room', 'invalid room');
    itTestsBadBooking(booking, 'start', 'not a date object');
    itTestsBadBooking(booking, 'end', null);
  });

  describe('/POST create booking with failed user auth', () => {
    it('should return an error of wrong key', done => {
      const badToken = jwt.sign(booking, 'wrong key');
      chai
        .request(server)
        .post('/booking/create')
        .send({ token: badToken })
        .end((error, res) => {
          if (error) return done(error);
          res.should.have.status(401);
          res.body.should.be.a('object').that.have.all.keys('error');
          done();
        });
    });
    it('should return an error of invalid user', done => {
      const badUserBooking = cloneDeep(booking);
      badUserBooking.userId = 'bad user';
      const token = createToken(badUserBooking);
      chai
        .request(server)
        .post('/booking/create')
        .send({ token })
        .end((error, res) => {
          if (error) return done(error);
          res.should.have.status(401);
          res.body.should.be.a('object').that.have.all.keys('error');
          done();
        });
    });
  });
});

function itTestsBadBooking(booking, key, value) {
  let badBooking = cloneDeep(booking);
  badBooking[key] = value;
  const token = createToken(badBooking);
  it('should return ' + key + ' error', done => {
    chai
      .request(server)
      .post('/booking/create')
      .send({ token })
      .end((error, res) => {
        if (error) return done(error);
        res.should.have.status(400);
        res.body.should.be.a('object').that.have.all.keys('error');
        done();
      });
  });
}

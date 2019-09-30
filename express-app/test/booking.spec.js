const server = require('../index');
const cloneDeep = require('lodash.clonedeep');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const handleError = require('../routes/errorHandler');
chai.use(chaiHttp);

const moment = require('moment');

const Booking = require('../models/booking');
const Room = require('../models/room');

// temporary sign with jwt
const jwt = require('jsonwebtoken');
const createToken = payload => {
  return 'Bearer ' + jwt.sign(payload, process.env.API_KEY);
};

let allRooms;

describe('Bookings', () => {
  const user = { userId: 'dummyUserId' };
  const token = createToken(user);
  const booking = {
    userId: user.userId,
    room: '305',
    start: new Date(2019, 9, 20, 8),
    end: new Date(2019, 9, 20, 9)
  };

  before(async () => {
    allRooms = await Room.find({});
  });

  afterEach(async () => {
    await Booking.deleteMany({}, error => {
      if (error) console.error(error);
    });
    await allRooms.forEach(async room => {
      const query = { roomName: room.roomName };
      await Room.findOneAndUpdate(
        query,
        room,
        {
          new: true,
          useFindAndModify: false
        },
        (error, newRoom) => {
          if (error) console.error(error);
        }
      );
    });
  });

  describe('/POST create booking and add to rooms', () => {
    it('should return saved booking and saved room', done => {
      chai
        .request(server)
        .post('/booking/create')
        .set('authorization', token)
        .send({ booking })
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
    itTestsBadBooking(booking, 'room', 'invalid room', token);
    itTestsBadBooking(booking, 'start', 'not a date object', token);
    itTestsBadBooking(booking, 'end', null, token);
  });

  describe('/POST create booking with failed user auth', () => {
    it('should return an error of wrong key', done => {
      const badToken = 'Bearer ' + jwt.sign(user, 'wrong key');
      chai
        .request(server)
        .post('/booking/create')
        .set('authorization', badToken)
        .send({ booking })
        .end((error, res) => {
          if (error) return done(error);
          res.should.have.status(401);
          res.body.should.be.a('object').that.have.all.keys('error');
          done();
        });
    });

    it('should return an error of no key provided', done => {
      chai
        .request(server)
        .post('/booking/create')
        .send({ booking })
        .end((error, res) => {
          if (error) return done(error);
          res.should.have.status(401);
          res.body.should.be.a('object').that.have.all.keys('error');
          done();
        });
    });
  });

  describe('/GET get the bookings of a particular user', () => {
    it('should return an array of bookings', async () => {
      const testBooking = cloneDeep(booking);
      testBooking.start = new Date(2020, 5, 20, 3);
      testBooking.end = new Date(2020, 5, 20, 4);
      testBooking.createdAt = new Date();
      const listOfChanges = [
        { start: new Date(2020, 5, 20, 2) },
        { room: '204' },
        { end: new Date(2020, 5, 20, 5) },
        { room: '204', start: new Date(2020, 5, 20, 2) },
        { start: new Date(2020, 5, 22, 3), end: new Date(2020, 5, 22, 5) }
      ];
      const listOfBookings = await listOfChanges.map(e => {
        x = cloneDeep(testBooking);
        for (var key in e) x[key] = e[key];
        return x;
      });
      await Booking.insertMany(listOfBookings);

      const res = await chai
        .request(server)
        .get('/booking')
        .set('authorization', token)
        .send({ userId: user.userId });
      res.should.have.status(200);
      res.body.should.be.a('object').that.have.property('bookings');
      res.body.bookings.should.have.lengthOf(5);
      const bookings = res.body.bookings;
      for (let i = 0; i < bookings.length; i++) {
        expect(bookings[i].userId).to.equal(user.userId);
        expect(bookings[i].room).to.equal(listOfBookings[i].room);
        ['start', 'end'].forEach(e => {
          const dbProps = moment(bookings[i][e]).format();
          const testProps = moment(listOfBookings[i][e]).format();
          expect(dbProps).to.equal(testProps);
        });
      }
    });
  });
});

  describe('/POST create booking with failed user auth', () => {
    it('should return an error of wrong key', done => {
      const badToken = 'Bearer ' + jwt.sign(user, 'wrong key');
      chai
        .request(server)
        .post('/booking/create')
        .set('authorization', badToken)
        .send({ booking })
        .end((error, res) => {
          if (error) return done(error);
          res.should.have.status(401);
          res.body.should.be.a('object').that.have.all.keys('error');
          done();
        });
    });

    it('should return an error of no key provided', done => {
      chai
        .request(server)
        .post('/booking/create')
        .send({ booking })
        .end((error, res) => {
          if (error) return done(error);
          res.should.have.status(401);
          res.body.should.be.a('object').that.have.all.keys('error');
          done();
        });
    });
  });
});

function itTestsBadBooking(booking, key, value, token) {
  let badBooking = cloneDeep(booking);
  badBooking[key] = value;
  it('should return ' + key + ' error', done => {
    chai
      .request(server)
      .post('/booking/create')
      .set('authorization', token)
      .send({ booking: badBooking })
      .end((error, res) => {
        if (error) return done(error);
        res.should.have.status(400);
        res.body.should.be.a('object').that.have.all.keys('error');
        done();
      });
  });
}

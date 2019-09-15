const server = require('../index');
const to = require('await-to-js').default;

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const handleError = require('../routes/errorHandler');
chai.use(chaiHttp);

const Booking = require('../models/booking');
const Room = require('../models/room');

describe('Bookings', () => {
  let booking = {
    room: '305',
    start: new Date(2019, 9, 20, 8),
    end: new Date(2019, 9, 20, 9),
    api_key: process.env.API_KEY
  }

  beforeEach((done) => {
    Booking.deleteMany({}, (error) => {if (error) return done()});
    Room.findOne({roomName: booking.room}, (error, foundRoom) => {
      if (error) return done();
      const index = foundRoom.hoursBooked.indexOf(booking.start.toString());
      if (index > -1) foundRoom.hoursBooked.splice(index, 1);
      Room.findOneAndUpdate({roomName: booking.room}, foundRoom, {useFindAndModify: false}, (error) => {
        done();
      });
    });
  })

  describe('/POST create booking and add to rooms', () => {
    it('should return saved booking and saved room', (done) => {
      chai.request(server).post('/booking/create').send(booking).end((error, res) => {
        if (error) {
          handleError(res, error, 'Failed to create booking');
          done();
        }
        res.should.have.status(201);
        res.body.should.have.keys('savedBooking', 'savedRoom');
        const savedBooking = res.body.savedBooking, savedRoom = res.body.savedRoom;
        savedBooking.should.be.a('object').that.include.all.keys('room', 'start', 'end');
        savedRoom.should.be.a('object').that.have.property('hoursBooked');
        expect(savedRoom.hoursBooked).to.be.an('array').that.includes(savedBooking.start);
        done();
      })
    })
  })
})

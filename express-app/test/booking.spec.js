const server = require('../index');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const handleError = require('../routes/errorHandler');
chai.use(chaiHttp);

const Booking = require('../models/booking');
const Room = require('../models/room');

describe('Bookings', () => {
  beforeEach((done) => {
    Booking.deleteMany({}, (error) => {
      done();
    });
  })

  describe('/POST create booking', () => {
    it('should return saved booking', (done) => {
      let booking = {
        room: '305',
        start: new Date(),
        end: new Date(),
        api_key: process.env.API_KEY
      }

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

const server = require('../index');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const handleError = require('../routes/errorHandler');
chai.use(chaiHttp);

const Booking = require('../models/booking');

describe('Books', () => {
  beforeEach((done) => {
    Booking.remove({}, (error) => {
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
        res.body.should.be.a('object');
        res.body.should.have.property('room');
        res.body.should.have.property('start');
        res.body.should.have.property('end');
        done();
      })
    })
  })
})

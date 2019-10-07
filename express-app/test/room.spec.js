const server = require('../index');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const handleError = require('../routes/errorHandler');
chai.use(chaiHttp);

const Room = require('../models/room');

const numberOfRooms = 2;

describe('Rooms', () => {
  describe('/GET rooms', () => {
    it('should return an array of rooms', done => {
      chai
        .request(server)
        .get('/api/room')
        .end((error, res) => {
          if (error) {
            handleError(res, error, 'Failed to find all rooms');
            done();
          }
          res.should.have.status(200);
          const rooms = res.body.rooms;
          rooms.should.be.a('array');
          expect(rooms).to.have.lengthOf(numberOfRooms);
          done();
        });
    });
  });
});

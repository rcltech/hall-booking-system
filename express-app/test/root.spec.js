const server = require('../index');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('/GET root', () => {
  it('should return a string', done => {
    chai
      .request(server)
      .get('/api/')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.text).to.equal('home page');
        done();
      });
  });
});

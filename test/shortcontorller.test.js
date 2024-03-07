const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http')
const app = require('../app')


chai.use(chaiHttp);


describe('Checking the health route', () => {
    it('should retun a 200 status code', (done) => {
        chai.request(app)
        .get('/ping')
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.message).to.be.equal('OK')
            done();
        });
        
    })
})

describe('Checking database short code', () => {
    it('should retun a 200 status code', (done) => {
        chai.request(app)
        .get('/short')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    })
})
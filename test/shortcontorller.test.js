const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); // app.js

chai.use(chaiHttp);

const expect = chai.expect;

describe('URL Shortener', () => {

  it('should shorten a URL', async () => {
    const res = await chai.request(server)
      .post('/short')
      .send({
        url: 'https://www.google.com/'
      });
    
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('short_url');
  });

  it('should redirect to original URL', async () => {
    const {short_url} = await chai.request(server)
      .post('/short')
      .send({
        url: 'https://www.google.com/'  
      });

    const res = await chai.request(server).get(short_url);
    
    expect(res).to.redirectTo('https://www.google.com/');
  });

  it('should return 404 for invalid short URL', async () => {
    const res = await chai.request(server).get('/short/abc123');

    expect(res).to.have.status(404);
  });

});

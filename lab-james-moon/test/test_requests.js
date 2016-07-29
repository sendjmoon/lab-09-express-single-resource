'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
require('../server');

describe('testing GET requests', function() {
  let uniqueId;
  before(function(done) {
    request('localhost:3000')
    .post('/api/hero')
    .send({name: 'sylvanas', race: 'undead', faction: 'horde'})
    .end(function(err, res) {
      uniqueId = res.text.substr(7,36);
      done();
    });
  });
  it('/GET should respond with 400 bad request error', function(done) {
    request('localhost:3000')
    .get('/api/hero')
    .end(function(err, res) {
      if (err) console.log(err.toString());
      expect(res).to.have.status(400);
      expect(res.text).to.eql('bad request');
      done();
    });
  });
  it('/GET should respond with 404 not found error', function(done) {
    request('localhost:3000')
    .get('/api/hero/321')
    .end(function(err, res) {
      if (err) console.log(err.toString());
      expect(res).to.have.status(404);
      expect(res.text).to.eql('not found');
      done();
    });
  });
  it('/GET should respond with 202 and the hero\'s info in json format', function(done) {
    request('localhost:3000')
    .get('/api/hero/' + uniqueId)
    .end(function(err, res) {
      if (err) console.log(err.toString());
      expect(res.text).to.eql('{"id":"' + uniqueId + '","name":"sylvanas","race":"undead","faction":"horde"}');
      done();
    });
  });
  it('should respond with a new hero in {data} format', function(done) {
    request('localhost:3000')
    .post('/api/hero')
    .send({name: 'thrall', race: 'orc', faction: 'horde'})
    .end(function(err, res) {
      let thrallId = res.text.substr(7,36);
      if (err) console.log(err.toString());
      expect(res).to.have.status(202);
      expect(res.text).to.eql('{"id":"' + thrallId + '","name":"thrall","race":"orc","faction":"horde"}');
      done();
    });
  });
});

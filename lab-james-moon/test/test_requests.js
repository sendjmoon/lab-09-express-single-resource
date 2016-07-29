'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
require('../server');

describe('testing GET, PUT, and POST requests', function() {
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
  it('/GET should respond with 404 not found error for unregistered routes', function(done) {
    request('localhost:3000')
    .get('/api/test')
    .end(function(err, res) {
      expect(err);
      expect(res).to.have.status(404);
      expect(res.text).to.eql('that page was not found');
      done();
    });
  });
  it('/GET should respond with 400 bad request error', function(done) {
    request('localhost:3000')
    .get('/api/hero')
    .end(function(err, res) {
      expect(err);
      expect(res).to.have.status(400);
      expect(res.text).to.eql('that\'s a bad request');
      done();
    });
  });
  it('/GET should respond with 404 not found error', function(done) {
    request('localhost:3000')
    .get('/api/hero/321')
    .end(function(err, res) {
      expect(err);
      expect(res).to.have.status(404);
      expect(res.text).to.eql('that page was not found');
      done();
    });
  });
  it('/GET should respond with 202 and the hero\'s info in json format', function(done) {
    request('localhost:3000')
    .get('/api/hero/' + uniqueId)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(202);
      expect(res.text).to.eql('{"id":"' + uniqueId + '","name":"sylvanas","race":"undead","faction":"horde"}');
      done();
    });
  });
  it('/PUT should respond with 400 bad request error when no body provided', function(done) {
    request('localhost:3000')
    .put('/api/hero/' + uniqueId)
    .send({})
    .end(function(err, res) {
      expect(err);
      expect(res).to.have.status(400);
      expect(res.text).to.eql('that\'s a bad request');
      done();
    });
  });
  it('/PUT should respond with 400 bad request error when invalid body provided', function(done) {
    request('localhost:3000')
    .put('/api/hero/' + uniqueId)
    .send({type: 'what what'})
    .end(function(err, res) {
      expect(err);
      expect(res).to.have.status(400);
      expect(res.text).to.eql('that\'s a bad request');
      done();
    });
  });
  it('/PUT should respond with the updated hero information in {data} format', function(done) {
    request('localhost:3000')
    .put('/api/hero/' + uniqueId)
    .send({name: 'james'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(202);
      expect(res.text).to.eql('{"id":"' + uniqueId + '","name":"james","race":"undead","faction":"horde"}');
      done();
    });
  });
  it('/POST should respond with 400 bad request error when no body provided', function(done) {
    request('localhost:3000')
    .post('/api/hero')
    .send({})
    .end(function(err, res) {
      expect(err);
      expect(res).to.have.status(400);
      expect(res.text).to.eql('that\'s a bad request');
      done();
    });
  });
  it('/POST should respond with 400 bad request error when invalid body provided', function(done) {
    request('localhost:3000')
    .post('/api/hero')
    .send({type: 'james'})
    .end(function(err, res) {
      expect(err);
      expect(res).to.have.status(400);
      expect(res.text).to.eql('that\'s a bad request');
      done();
    });
  });
  it('/POST should respond with a new hero in {data} format', function(done) {
    request('localhost:3000')
    .post('/api/hero')
    .send({name: 'thrall', race: 'orc', faction: 'horde'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      let thrallId = res.text.substr(7,36);
      expect(res).to.have.status(202);
      expect(res.text).to.eql('{"id":"' + thrallId + '","name":"thrall","race":"orc","faction":"horde"}');
      done();
    });
  });
});

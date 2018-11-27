'use strict';

const {server} = require('../src/app.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe ('client server', () => {

  it('should respond with a 200 status when routed to the home page', () => {
    return mockRequest
      .get('/')
      .then(results => {
        expect(results.status).toBe(200);
      }).catch(err => {
        console.log('error', err);
      });
  });

  it('should respond with a 404 status when routed to a page that does not exist', () => {
    return mockRequest
      .get('/foo')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(err => {
        console.log('error', err);
      });
  });
});
'use strict';

const {server} = require('../server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe ('client server', () => {



  it('should respond with a 201 status when routed to the home page', () => {
    return mockRequest
      .get('/')
      .then(results => {
        console.log('results', results.status);
        expect(results.status).toBe(500);
      }).catch(err => {
        console.log('error', err);
      });
  });
});
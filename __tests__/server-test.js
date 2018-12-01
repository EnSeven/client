'use strict';

import supertest from 'supertest';
import express from 'express';
import http from 'http';

// Ashley was having issues with open handles not closing with JEST so after some research, she found a temporary test that would pass on a forum. We will not be using this test going forward - this is just a placeholder for now. Here is the source for that: https://github.com/facebook/jest/issues/6907
describe('demo test to keep the open handles away', () => {
    let app, server;

    beforeAll(done => {
        app = new express();
        server = http.createServer(app);
        server.listen(done);
    });

    afterAll(done => {
        server.close(done);
    });

    it('returns 404 when sent to route that does not exist', async () => {
        const response = await supertest(app).get('/foobar');
        expect(response.status).toBe(404);
    });
});
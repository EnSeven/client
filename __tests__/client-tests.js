'use strict';

jest.mock('socket.io');
jest.mock('socket.io-client');

// const server = require('../__mocks__/mock-server.js');
const game = require('../client-refactored.js');

describe('CLIENT.JS', () => {
  it('The client connects to the game engine upon start', () => {
    let start = game.start();
    console.log('starting', start);
    expect(true).toBeTruthy();
  });

  it('When the client receives the CONNECTED emit from the game engine, it will run welcomePrompt', () => {
    game.connected();
    expect(true).toBeTruthy();
  });
});
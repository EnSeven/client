'use strict';

jest.mock('socket.io');
jest.mock('socket.io-client');
// const server = require('../__mocks__/mock-server.js');
const game = require('../refactored-code-for-testing/client-refactored.js');

describe('CLIENT.JS', () => {

  it('The client successfully starts the server.', () => {
    expect(game.start()).toBe('successfully started server');
  });

  it('The client connects to the game engine upon connect.', () => {
    expect(game.connect()).toBeTruthy;
  });

  it('The client will send the email, username, password to the game server successfully.', () => {
    expect(game.signedInNewUser).toBeDefined;
  });

});
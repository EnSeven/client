'use strict';

// import { SocketIO, Server } from 'mock-socket';

// const io = require('socket.io-client');

// Require the module under test

const ioClient = require('socket.io-client');
const ioServer = require('socket.io')(3000);


const client = require('../client.js');

let urlVariable = 'https://enseven-game-engine.herokuapp.com';
const socket = io.connect(urlVariable);

describe('client app', () => {
  it('does not allow objects as a param', () => {
    let message = hello.sayHello({});
    expect(message).toBeNull();
  });

  it('works when given a word', () => {
    var message = hello.sayHello('John');
    var expectedOutput = 'Hello, John';
    expect(message).toEqual(expectedOutput);
  });

}); 

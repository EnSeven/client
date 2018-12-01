'use strict';
const io = require('socket.io-client');
const superagent = require('superagent');
const prompt = require('prompt');
const socket = io.connect('https://enseven-game-engine.herokuapp.com');


socket.on('connected', payload => {
  console.log(payload);
  prompt.start();
  const userSchema = {
    properties: {
      username: {
        pattern: /^[a-zA-Z0-9]+$/,
        message: 'Name must be only letters and numbers',
        required: true,
      },
      password: {
        hidden: true,
        replace: '*',
        required: true,
      },
    },
  };
  // Get two properties from the user: email, password
  prompt.get(userSchema, function (err, result) {
    // Log the results.
    //result should be sent to API

    // console log for testing
    // console.log('results', JSON.stringify(result));

    let newResult = JSON.stringify(result);
    superagent.post('https://enseven-api-service.herokuapp.com/signup')
      .send(newResult)
      .set('Content-Type', 'application/json')
      .then(data =>{

        // console log for testing
        // console.log('user data test', data);
        
        socket.emit('join', data);
      })
      .catch(error => {
        console.log(error);
      });
  });
});

// sending to sender-client only
socket.emit('start');

//test server to verify input output 
import { WebSocket, Server } from 'mock-socket';

import test from 'ava';
import { Server } from 'mock-socket';

class ChatApp {
  constructor(url) {
    this.messages = [];
    this.connection = new WebSocket(url);

    this.connection.onmessage = (event) => {
      this.messages.push(event.data);
    };
  }

  sendMessage(message) {
    this.connection.send(message);
  }
}

test.cb('that chat app can be mocked', t => {
  const fakeURL = 'ws://localhost:8080';
  const mockServer = new Server(fakeURL);

  mockServer.on('connection', socket => {
    socket.on('message', data => {
      t.is(data, 'test message from app', 'we have intercepted the message and can assert on it');
      socket.send('test message from mock server');
    });
  });

  const app = new ChatApp(fakeURL);
  app.sendMessage('test message from app'); // NOTE: this line creates a micro task

  // NOTE: this timeout is for creating another micro task that will happen after the above one
  setTimeout(() => {
    t.is(app.messages.length, 1);
    t.is(app.messages[0], 'test message from mock server', 'we have subbed our websocket backend');
    mockServer.stop(t.done);
  }, 100);
});
'use strict';

import test from 'ava';
import { SocketIO, Server } from 'mock-socket';

const io = require('socket.io-client');
describe('client app', () => {
  // let app, server;

  // beforeAll(done => {
  //     app = new express();
  //     server = http.createServer(app);
  //     server.listen(done);
  // });

  // afterAll(done => {
  //     server.close(done);
  // });

  // it('returns 404 when sent to route that does not exist', async () => {
  //     const response = await supertest(app).get('/foobar');
  //     expect(response.status).toBe(404);
  // });

  class ChatApp {
    constructor(url) {
      this.messages = [];
      this.connection = new io(url);
      
      this.connection.on('chat-message', event => {
        this.messages.push(event.data);
      });
    }
    
    sendMessage(message) {
      this.connection.emit('chat-message', message);
    }
  }
   
  it('ensures that socket.io works', t => {
    const fakeURL = 'ws://localhost:8080';
    const mockServer = new Server(fakeURL);
    
    window.io = SocketIO;
    
    mockServer.on('connection', socket => {
      socket.on('chat-message', data => {
        t.is(data, 'test message from app', 'we have intercepted the message and can assert on it');
        socket.emit('chat-message', 'test message from mock server');
      });
    });
    
    const app = new ChatApp(fakeURL);
    app.sendMessage('test message from app');
    
    setTimeout(() => {
      t.is(app.messages.length, 1);
      t.is(app.messages[0], 'test message from mock server', 'we have subbed our websocket backend');
      
      mockServer.stop(t.done);
    }, 100);
  });

}); 

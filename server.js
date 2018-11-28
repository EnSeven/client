'use strict';

const io = require('socket.io')(3000);
const sockets = [];

io.on('connection', (socket) => {
  sockets.push(socket);
  console.log('player 1 ready');
  // sockets[socket.id] = socket;
  // socket.on('start', payload) => {
  //   io.broadcast('player 1 ready');
  // }
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

console.log('Ready to play on port 3000');
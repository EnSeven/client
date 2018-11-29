'use strict';

const io = require('socket.io')(3000);
const sockets = [];

io.on('connection', (socket) => {
  sockets.push(socket);
  console.log('player 1 ready');
  // socket.on('start', payload) => {
  //   io.broadcast(`player ${socket.id} ready`);
  // }
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('start', (payload) => {
    console.log('paylod', payload);
    socket.emit('connected', {message: 'hi'});
  });
});



console.log('Ready to play on port 3000');
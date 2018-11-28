'use strict';

const io = require('socket.io')();
const sockets = [];

io.on('connection', function(socket) {
  sockets.push(socket);
  console.log('player 1 ready');
  // sockets[socket.id] = socket;
  // socket.on('start', payload) => {
  //   io.broadcast('player 1 ready');
  // }
});

io.listen(3000);
console.log('Listening on port 3000');
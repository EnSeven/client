'use strict';

const io = require('socket.io')(3000);
const sockets = [];

// when someone connects to the server (nodemon or node server.js)
io.on('connection', (socket) => {
  sockets.push(socket);
  console.log('sockets', sockets);

  // when someone connects via node client.js
  socket.on('start', () => {
    socket.emit('connected', `Player ${socket.id} ready`);
    console.log(`Player ${socket.id} has joined the game`);

  });

  // when someone disconnects via node client.js
  socket.on('disconnect', () => {
    socket.removeAllListeners();
    console.log(`Player ${socket.id} has left the game`);
  });

});

console.log('Ready to play on port 3000');
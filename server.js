'use strict';

const io = require('socket.io')(3000);
const sockets = [];

// when someone connects to the server (nodemon or node server.js)
io.on('connection', (socket) => {
  sockets.push(socket);
  // console.log('sockets', sockets);

  // when someone connects via node client.js
  socket.on('start', () => {
    socket.emit('connected', `player ${socket.id} ready`);
  });

  // when someone disconnects via node client.js
  socket.on('disconnect', () => {
    console.log('user has left the game');
  });

});

console.log('Ready to play on port 3000');
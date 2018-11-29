'use strict';
const io = require('socket.io-client');
let socket = io.connect('http://localhost:3000');

socket.on('connected', payload => {
  console.log('payload', payload);
});

// sending to sender-client only
socket.emit('start', 'khadkhaskdjhskd');

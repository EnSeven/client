'use strict';
const io = require('socket.io-client');
let socket = io.connect('http://localhost:3000');

socket.on('connected', payload => {
  console.log(payload);
})
socket.emit('start', 'khadkhaskdjhskd');

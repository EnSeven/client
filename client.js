'use strict';
const io = require('socket.io');

io.connect('localhost://3000');

// io.emit('start', token);
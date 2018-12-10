// 'use strict';

// jest.mock('socket.io');

// const io = require('socket.io')(8080);

// io.on('connection', (socket) => {  
//   console.log('connected', socket);
//   return true;
// });

'use strict';

jest.mock('socket.io');

const io = require('socket.io')();
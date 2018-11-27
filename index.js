'use strict';

// 3rd Party Resources
const express = require('express');
// const socket = io('http://localhost');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.get('/', (req,res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};

// socket.on('connect', function(){
//   socket.emit('message', 'Hello World');
	
//   socket.on('message', function(data){
//     console.log('Message Received: ', data);
//   });
// });
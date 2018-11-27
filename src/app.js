'use strict';

// 3rd Party Resources
const express = require('express');
// const socket = io('http://localhost');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.get('/', homePage);

function homePage(request,response) {
  response.render('site', {page:'./site', title:'Proof of Life'});
}

let isRunning = false;

module.exports = {
  server: app,
  start: (port) => {
    if(!isRunning) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
};

// socket.on('connect', function(){
//   socket.emit('message', 'Hello World');
	
//   socket.on('message', function(data){
//     console.log('Message Received: ', data);
//   });
// });
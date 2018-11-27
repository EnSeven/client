'use strict';

// 3rd Party Resources
const express = require('express');
// const socket = io('http://localhost');


// Prepare the express app
const app = express();

const PORT = 8080;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.get('/', homePage);

function homePage(request,response) {
  response.render('site', {page:'./site', title:'Our Site: Proof of Life', status: 200});
}

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
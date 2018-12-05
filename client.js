'use strict';
const io = require('socket.io-client');
const superagent = require('superagent');
const prompt = require('prompt');
const socket = io.connect('https://enseven-game-engine.herokuapp.com');
const chalk = require('chalk');

console.log(chalk.blue('Let the battle BEGIN!!!'));


socket.on('connected', payload => {
  console.log(chalk.bgMagenta(payload));
  prompt.start();
  const userSchema = {
    properties: {
      username: {
        pattern: /^[a-zA-Z0-9]+$/,
        message: 'Name must be only letters and numbers',
        required: true,
      },
      password: {
        hidden: true,
        replace: '*',
        required: true,
      },
    },
  };
  // Get two properties from the user: email, password
  prompt.get(userSchema, function (err, result) {
    // Log the results.
    //result should be sent to API

    // console log for testing
    // console.log('results', JSON.stringify(result));

    let newResult = JSON.stringify(result);
    superagent.post('https://enseven-api-service.herokuapp.com/signup')
      .send(newResult)
      .set('Content-Type', 'application/json')
      .then(data =>{

        // console log for testing
        // console.log('user data test', data);
        
        socket.emit('join', data);
      })
      .catch(error => {
        console.log(error);
      });
  });
});

// sending to sender-client only
socket.emit('start');

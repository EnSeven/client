'use strict';
const io = require('socket.io-client');
const superagent = require('superagent');
const prompt = require('prompt');
const socket = io.connect('https://enseven-game-engine.herokuapp.com');
// const readline = require('readline');
// let userAuths = [];

socket.on('connected', payload => {
  function create() {
    prompt.start();
    const userSchema = {
      properties: {
        username: {
          description: 'Enter your username',
          pattern: /^[a-zA-Z0-9]+$/,
          message: 'Name must be only letters and numbers',
          required: true,
        },
        password: {
          description: 'Enter in your password',
          hidden: true,
          replace: '*',
          required: true,
        },
      },
    };
  
    // Get two properties from the user: email, password
    prompt.get(userSchema, function (err, result) {
      // Log the results.
      // result should be sent to API
      // console.log('results', JSON.stringify(result));
      console.log('Command-line input received:');
      console.log('username: ' + result.username);
      console.log('password: ' + result.password);
  
      let newResult = JSON.stringify(result);
      superagent.post('https://enseven-api-service.herokuapp.com/signup')
        .send(newResult)
        .set('Content-Type', 'application/json')
        .then(data =>{
          // console.log('user data test', data);
          socket.emit('join', data);
          console.log('you have joined the game');
        })
        .catch(error => {
          // console.log(error);
          if (error) {
            console.log('This username already exists with a different password. Please try again.');
            login();
          }
        });
    });
  }
  create();

  function login() {
    prompt.start();
    const userSchema = {
      properties: {
        username: {
          description: 'Enter your username',
          pattern: /^[a-zA-Z0-9]+$/,
          message: 'Name must be only letters and numbers',
          required: true,
        },
        password: {
          description: 'Enter in your password',
          hidden: true,
          replace: '*',
          required: true,
        },
      },
    };

    prompt.get(userSchema, function (err, result) {
      console.log('Command-line input received:');
      console.log('username: ' + result.username);
      console.log('password: ' + result.password);
      // let newResultUser = JSON.stringify(result.username);
      // let newResultPass = JSON.stringify(result.password);
      superagent.post(`https://enseven-api-service.herokuapp.com/signin`)
        .auth(result.username, result.password)
        .set('Content-Type', 'application/json')
        .then(data =>{
          socket.emit('join', data);
          console.log('you have joined the game');
        })
        .catch(error => {
        // console.log(error);
          if (error) {
            console.log('Wrong Username/Password Combination. Try again.');
            // console.log(error);
            login();
          }
        });
    });
  }
});

// sending to sender-client only
socket.emit('start');

'use strict';
const io = require('socket.io-client');
const superagent = require('superagent');
const prompt = require('prompt');
const socket = io.connect('https://enseven-game-engine.herokuapp.com');
const readline = require('readline');

//setting readline to read from standard (keyboard) input and output streams
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


// Welcome user. Explain how to use app by setting the rl prompt, and then calling the prompt
rl.setPrompt('Welcome to N7 Games. To begin type LOGIN to login to an existing account, or type CREATE to create a new account.');
rl.prompt();

rl.question('LOGIN or CREATE account? ', function(answer){
  if(answer){
    switch(answer){
    case 'LOGIN':
      // put login function / event here
      break;
    case 'CREATE':
      // put create account function / event here
      break;
    //setting the default to kindly remind the user how to not cause errors and asking again
    default:
      rl.setPrompt('LOGIN to login, CREATE to create new account. ');
      rl.prompt();
      // once we wrap this question in a function, callback this function to run again.
    }
  }
  rl.close();
});

// on connection start the prompt module and collect login / account based on the userSchema (we can and should keep userSchema outside of the function later on)
socket.on('connected', payload => {
  console.log(payload);
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
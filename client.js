'use strict';
const io = require('socket.io-client');
// const superagent = require('superagent');
const prompt = require('prompt');
const socket = io.connect('https://enseven-game-engine.herokuapp.com');
const readline = require('readline');

//setting readline to read from standard (keyboard) input and output streams. also setting a timeout limit if no input is received for any readline prompts / inputs.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  escapeCodeTimeout: 30000,
});


function welcomePrompt() {
  // Welcome user. Explain how to use app by setting the rl prompt, and then calling the prompt
  rl.question('Welcome to N7 Games. To begin type LOGIN to login to an existing account, or type CREATE to create a new account.', function(answer) {
    firstQuestionPromptLoop(answer);
  });
  // firstQuestionPromptLoop();
}

function firstQuestionPromptLoop(answer) {
  //this needs to be wrapped in an invokable function, it's auto kicking to this before doing the welcome prompt
  if(answer){
    switch(answer){
    case 'LOGIN':
      login();
      break;
    case 'CREATE':
      // TODO: Check this out later
      rl.close();
      create();
      // rl.resume();
      break;
      //setting the default to kindly remind the user how to not cause errors and asking again
    default:
      rl.setPrompt('LOGIN to login, CREATE to create new account. ');
      firstQuestionPromptLoop();
        // once we wrap this question in a function, callback this function to run again since the user did not type CREATE or LOGIN.
    }
  }
  // console.log('brokeout of switch case');
}


function login() {
  prompt.start();
  const userSchema = {
    properties: {
      email: {
        description: 'Enter your email address',
        required: true,
      },
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
    socket.emit('signin', result);
  });
}

function create() {
  prompt.start();
  const userSchema = {
    properties: {
      email: {
        description: 'Enter your email address',
        required: true,
      },
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
    // socket.emit('signup', result);
  });
}

// on connection start the prompt module and collect login / account based on the userSchema (we can and should keep userSchema outside of the function later on)
socket.on('connected', payload => {
  // console.log('payload', payload);
});

// sending to sender-client only
welcomePrompt();
socket.emit('start');
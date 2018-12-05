'use strict';
const io = require('socket.io-client');
const prompt = require('prompt');
const socket = io.connect('http://172.16.5.198:4040');
// const socket = io.connect('https://enseven-game-engine.herokuapp.com');
// const socket = io.connect('https://cdk-socket-io-test.herokuapp.com/');

const readline = require('readline');
// const players = io.of('/players');

//setting readline to read from standard (keyboard) input and output streams. also setting a timeout limit if no input is received for any readline prompts / inputs.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  escapeCodeTimeout: 20000,
});

function welcomePrompt() {
  // Welcome user. Explain how to use app by setting the rl prompt, and then calling the prompt
  rl.question('Welcome to N7 Games. To begin, type LOGIN to login to an existing account, or type CREATE to create a new account.  ', function(answer) {
    firstQuestionPromptLoop(answer);
  });
}

function firstQuestionPromptLoop(answer) {
  //this needs to be wrapped in an invokable function, it's auto kicking to this before doing the welcome prompt
  if(answer){
    switch(answer){
    case 'LOGIN':
      rl.close();
      signin();
      break;
    case 'CREATE':
      // TODO: Check out the rl.close later
      rl.close();
      signup();
      break;
    default:
      welcomePrompt();
    }
  }
}

function signin() {
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
    socket.emit('sign-in', result);
  });
}

function signup() {
  prompt.start();
  const userSchema = {
    properties: {
      email: {
        description: 'Enter your email address',
        required: true,
      },
      username: {
        description: 'Create a username',
        pattern: /^[a-zA-Z0-9]+$/,
        message: 'Name must be only letters and numbers',
        required: true,
      },
      password: {
        description: 'Create a password',
        hidden: true,
        replace: '*',
        required: true,
      },
    },
  };
  
  prompt.get(userSchema, function (err, result) {
    socket.emit('sign-up', result);
  });
}

// username comes with this
socket.on('signed-in-newuser', payload => {
  let user = payload;
  socket.emit('join', user);
  console.log('signed in new user');
});
socket.on('player1-joined', payload => {
  console.log('player1 joined', payload);
});

socket.on('player2-joined', payload => {
  console.log('player2 joined', payload);
  socket.emit('play');
});

socket.on('input-request-p1', () => {
  socket.emit('input-p1', 'A');
  console.log('sending player 1 letter');
});

socket.on('input-request-p2', () => {
  socket.emit('input-p2', 'C');
  console.log('sending player 2 letter');
});

// socket.on('won')

// socket.on('lost')

// socket.on('quit-game')
//   socket.on('confirm-quit') // BOTH HAVE TO CONFIRM 
//       socket.emit('quit-confirmed')

//   socket.on('end', 'THIS QUITS COMPLETELY')

//   socket.emit('get-stats')

//   socket.on('stats', 'SHOW THE STATS')


// Sending to game engine to START the game 
socket.emit('start');

socket.on('connected', payload => {
  console.log(payload);
  welcomePrompt();
});
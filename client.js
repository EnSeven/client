'use strict';
const io = require('socket.io-client');
const prompt = require('prompt');
// const socket = io.connect('http://172.16.5.198:4039');
// const client = require('../Game-Engine/wordWizard/remoteClient.js');
// const socket = io.connect('https://cdk-socket-io-test.herokuapp.com/');
const socket = io.connect('https://enseven-game-engine.herokuapp.com');
const readline = require('readline');

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
socket.on('signed-in-user', payload => {
  let user = payload;
  socket.emit('join', user);
  console.log('signed in returning user');
});

socket.on('player1-joined', payload => {
  console.log('player1 joined');
  socket.emit('play');
});
socket.on('input-request', (word) => {
  let count = word.count + 1;
  console.log(word.category);
  console.log(word.string);
  console.log(`You have ${count} guesses left`);
  prompt.start();
  const input = {
    properties: {
      letter: {
        description: 'Enter a letter',
        required: true,
      },
    },
  };
  
  prompt.get(input, function (err, result) {
    socket.emit('input', result.letter);
  });
  
});
// socket.on('input-request', output => {
//   client.promptInquirer(client.gameState);
// });

socket.on('player2-joined', payload => {
  console.log('player2 joined');
  console.log(payload);
  socket.emit('play');
});


socket.on('results', results => {
  console.log('results:', results);
  socket.emit('play');
});

socket.on('won', () => {
  console.log('You have won!');
});

socket.on('lost', () => {
  console.log('You have lost!');
});


// socket.on('quit-game')
//   socket.on('confirm-quit') // BOTH HAVE TO CONFIRM 
//       socket.emit('quit-confirmed')

//   socket.on('end', 'THIS QUITS COMPLETELY')

socket.emit('get-stats');

//   socket.on('stats', 'SHOW THE STATS')
socket.on('output', (output) => {
  console.log(output);
});

// Sending to game engine to START the game 
socket.emit('start');

socket.on('connected', payload => {
  console.log(payload);
  welcomePrompt();
});
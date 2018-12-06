'use strict';

// const client = require('socket.io-client')();
// let socket = client.connect();
const io = require('socket.io-client')();
const socket = io.connect('https://cdk-socket-io-test.herokuapp.com/');
// const socket = io.connect('http://172.16.5.198:4040');
const readline = require('readline');
const prompt = require('prompt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  escapeCodeTimeout: 20000,
});

const game = module.exports = {};

game.welcomePrompt = () => {
  // Welcome user. Explain how to use app by setting the rl prompt, and then calling the prompt
  rl.question('Welcome to N7 Games. To begin, type LOGIN to login to an existing account, or type CREATE to create a new account.  ', function(answer) {
    game.firstQuestionPromptLoop(answer);
  });
};

game.firstQuestionPromptLoop = (answer) => {
//this needs to be wrapped in an invokable function, it's auto kicking to this before doing the welcome prompt
  if(answer){
    switch(answer){
    case 'LOGIN':
      rl.close();
      game.signin();
      break;
    case 'CREATE':
      // TODO: Check out the rl.close later
      rl.close();
      game.signup();
      break;
    default:
      game.welcomePrompt();
    }
  }
};

game.signin = () => {
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
};

game.signup = () => {
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
};

game.signedInNewUser = () => {
  socket.on('signed-in-newuser', payload => {
    let user = payload;
    socket.emit('join', user);
    console.log('signed in new user');
  });
};

game.player1Joined = () => {
  socket.on('player1-joined', payload => {
    console.log('player1 joined', payload);
  });
};

game.player2Joined = () => {
  socket.on('player2-joined', payload => {
    console.log('player2 joined', payload);
    socket.emit('play');
  });
};

game.inputRequestP1 = () => {
  socket.on('input-request-p1', () => {
    socket.emit('input-p1', 'A');
    console.log('sending player 1 letter');
  });
};

game.inputRequestP2 = () => {
  socket.on('input-request-p2', () => {
    socket.emit('input-p2', 'C');
    console.log('sending player 2 letter');
  });
};

game.won = () => {
  socket.on('won', () => {
    console.log('You have won!');
  });
};

game.lost = () => {
  socket.on('lost', () => {
    console.log('You have lost - better luck next time.');
  });
};

game.start = () => {
  socket.emit('start');
  game.connect();
  game.signedInNewUser();
  game.player1Joined();
  game.player2Joined();
  game.inputRequestP1();
  game.inputRequestP2();
  return 'successfully started server';
};    

game.connect = () => {
  socket.on('connected', payload => {
    console.log(payload);
    game.welcomePrompt();
  });
};

game.start();

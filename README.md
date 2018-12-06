# EnSeven 

#### CLIENT: Ashley Breunich, Mike Kermes, Brandon Hayes, Nicholas Welch
#### GAME ENGINE: Chris Kozlowski, Hollie Thomas, Matthew McQuain, James McDaniel
#### API: Kevin O'Halloran, Ed Puzino, Hai Le, James Denton

EnSeven uses [Socket.IO](https://socket.io/docs/) to connect two players to a game of hangman played directly from their terminal windows. A user can either create a new account or log into an existing account upon connection to the game server. Their wins and losses will be kept track of every time they complete a game. 

## Playing the Game

In order to play this game, a user will need to fork the client repo and clone it down to their machine. They can use [this](https://github.com/EnSeven/client) link to access the repository. 

1. Once the repository is on their computer, they will then need to install all dependencies (by typing **npm install** into their terminal) before starting up the game.
2. In order to start a game, a player will need to type **nodemon** OR **node client.js** into their terminal. They will then be connected to the game server and will then be prompted to either CREATE an account or LOGIN to an existing account. 

## Client Functionality
The client.js file is a Socket.IO server that connects to the game server's [Heroku link](https://enseven-game-engine.herokuapp.com). Upon starting up the client in the terminal (nodemon OR node client.js), a user will be connected to the game server and prompted to either CREATE a new account or LOGIN to an existing account. These prompts are initiated by both Readline and the npm package Prompt, which, based on a schema, prompt the user for their email (must be unique), username (must be unique), and password. See documentation links in Citations section below.

Once a token is sent back from the API to the game server, the game server lets the client know and the user is then signed in and requests to join the game. Once two players join the game, they begin playing, alternating turns guessing letters until they either run out of turns or guess the correct word. They are alerted if they won the game or lost the game and their stats are stored for future use. 

## Game Server Functionality

## API Functionality

## Citations
[Socket.IO Documentation](https://socket.io/docs/)

[Chalk Documentation](https://www.npmjs.com/package/chalk)

[Prompt Documentation](https://www.npmjs.com/package/prompt)

[Readline Documentation](https://nodejs.org/api/readline.html)
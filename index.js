'use strict';

require('dotenv').config();
require('babel-register');
require('./src/app.js').start(8080);

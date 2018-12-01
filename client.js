'use strict';

const prompt = require('prompt');
const colors = require('colors/safe');

prompt.message = colors.zebra('EnSeven');
prompt.properties.name = colors.rainbow('Username');

const userSchema = {
  properties: {
    Username: {
      pattern: /^[a-zA-Z0-9]+$/,
      message: 'Name must be only letters and numbers',
      required: true
    },
    password: {
      hidden: true,
      replace: '*',
      required: true
    }
  }
};

// Start the prompt
prompt.start();

// Get two properties from the user: email, password
prompt.get(userSchema, function (err, result) {

  // Log the results.
  //result should be sent to API
  console.log(result);
});

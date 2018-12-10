
'use strict';

module.exports = () => {

  const io = {};
  
  io.listen = port => {
    console.log('listener on ', port);
  };
  
  io.connect = () => {
    return io.socket;
  };
  
  io.socket = {
    on: (command, callback) => {
      callback('ran', command);
    },
    
    // TODO: possibly delete callback
    emit:  (command, payload, callback) => {
      if (callback) {
        callback('server ran ' + command + ' with ' + JSON.stringify(payload));
      } else {
        console.log('server ran ' + command + ' with ' + JSON.stringify(payload));
      }
    },
  };
  
  return io;
  
};
'use strict';
var io = require('lib').io;

var Network = function(config) {
  var url = config.url;
  var socket = io.connect();
  socket.on('connect', function() {
    socket.on('gameStep', function(data) {
      console.log(data);
    });
    socket.on('disconnect', function() {
    });
  });
};

module.exports.Network = Network;

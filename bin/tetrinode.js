//Todo this if can be drop using NODE_PATH 

var Interface = require('lib').Interface;
var Tetromino = require('lib').Tetromino;
var Playfield = require('lib').Playfield;
var Loop = require('lib').Loop;
var Logic = require('lib').Logic;
var io = require('lib').io;

var scr = new Interface();
var loop = new Loop();
var field = new Playfield();
var tetro = new Tetromino(2, 0, 0);
var logic = new Logic(scr, field, tetro, loop);


/*
 * In tetris keydown is special because it acelerates the game.
 */

// This only happends on the Terminal 
process.on('SIGINT', function() {
  clearInterval(loop.interval);
  scr.close();
});

var socket = io.connect('http://127.0.0.1:3000');
socket.on('connect', function() {

  socket.on('gameStep', function(data) {
    console.log(data);
  });

  socket.on('disconnect', function(){

  });

});


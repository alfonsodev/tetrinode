'use strict';

var Interface = require('lib').Display;
var Tetromino = require('lib').Tetromino;
var Playfield = require('lib').Playfield;
var Loop = require('lib').Loop;
var Menu = require('lib').Game.Menu;
var config = { url: 'http://127.0.0.1:3000' };
var Network = require('lib').Network;

var scr = new Interface();
var loop = new Loop();
var field = new Playfield();
var tetro = new Tetromino(2, 0, 0);
//var network = new Network(config);

var game = new Game(scr, field, tetro, loop);

// This only happends on the Terminal
process.on('SIGINT', function() {
  clearInterval(loop.interval);
  scr.close();
});


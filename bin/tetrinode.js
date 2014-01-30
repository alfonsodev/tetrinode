'use strict';

var Display = require('lib').Display;
var Tetromino = require('lib').Tetromino;
var Playfield = require('lib').Playfield;
var Loop = require('lib').Loop;
var Menu = require('lib').Game.Menu;
var config = { url: 'http://127.0.0.1:3000' };
var Network = require('lib').Network;

var dis = new Display();
var loop = new Loop();
var field = new Playfield();
var tetro = new Tetromino(2, 0, 0);
//var network = new Network(config);

var options = [
  { 'title': 'Single Player', 'module': 'Single' },
  { 'title': 'Multi Player: ARENA', 'module': 'Versus' },
  { 'title': 'Exit', 'module': 'Exit' }
];

var menu = new Menu(dis, options);
var Game, game;
menu.show();

menu.on('selection', function(selected) {
  Game = require('lib').Game.Mode[selected.module];
  dis.wins[0].clear();
  dis.wins[0].refresh();
  setTimeout(function() {
    game = new Game(dis, field, tetro, loop);
  }, 200);
});
// This only happends on the Terminal
process.on('SIGINT', function() {
  clearInterval(loop.interval);
  dis.close();
});


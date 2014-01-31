'use strict';

var Loop = require('lib').Loop;
var Single = function(scr, field, tetro, ghost, loop) {
  this.scr = scr;
  this.field = field;
  this.tetro = tetro;
  this.loop = loop;
  this.fast = 70;
  this.slow = 1000;
  this.action = null;
  this.ghost = ghost;

  // Todo: make this debug info optional
  // this.scr.write(2, 60, 'move L'+t[0] + ':'+ (t[1]*0.000001));

  //this.moveGhost();
  // this.scr.startListeningKeyEvents();
  this.scr.render(this.field, this.tetro, this.ghost);
  this.loop.createInterval(1000, this.gameStep.bind(this));

  //Accelerate the game on Keydown
  this.scr.removeAllListeners('keydown');
  this.scr.on('keydown', (function(key) {
    //block more keys until next step is done
    //this.scr.blockKeys = true;
    if (key === 'space') {
      this.action = 'drop';
    } else {
      this.action = key;
    }
    if (this.loop.speed != this.fast) {
      this.loop.createInterval(this.fast, this.gameStep.bind(this));
    }
  }).bind(this));
  //Slow it down again on keyup
};

Single.prototype.gameStep = function() {
  // Call the function with pressed key name
  var lines;
//  this.moveGhost();
  lines = this.field.clearComplete();
  if (this.action) {
    this[this.action]();
    this.action = null;
  } else {
    this.down();
    if (this.loop.speed == this.fast)
      this.loop.createInterval(this.slow, this.gameStep.bind(this));
  }
  this.field.clearComplete()
  process.nextTick(function() {
    this.scr.render(this.field, this.tetro, this.ghost);
  }.bind(this));
  // this.scr.blockKeys = false;
};

Single.prototype.down = function() {
  var randomnumber;
  if (this.field.collideDown(this.tetro)) {
    this.field.update(this.tetro);
    this.tetro.posY = 0;
    this.tetro.posX = 4;
    randomnumber = Math.floor(Math.random() * 7),
    this.tetro.type = randomnumber;
    this.ghost.type = randomnumber;
    this.ghost.posY = this.tetro.posY;
    this.ghost.posX = this.tetro.posX;
    this.dropGhost();
  } else {
    this.tetro.posY++;
  }
};

Single.prototype.up = function() {
  this.tetro.rotate(false);
  this.ghost.posY = this.tetro.posY;
  this.ghost.rotate(false);
  this.dropGhost();
};

Single.prototype.right = function() {
  if (this.field.collideRight(this.tetro) === false) {
    this.tetro.posX++;
    this.ghost.posY = this.tetro.posY;
    this.ghost.posX++;
    this.dropGhost();
  }
};

Single.prototype.left = function() {
  if (this.field.collideLeft(this.tetro) === false) {
    this.tetro.posX = this.tetro.posX - 1;
    this.ghost.posY = this.tetro.posY;
    this.ghost.posX = this.ghost.posX - 1;
    this.dropGhost();
  }
};

Single.prototype.drop = function() {
  while (!this.field.collideDown(this.tetro)) {
    this.tetro.posY++;
  }
};

Single.prototype.dropGhost = function() {
  while (!this.field.collideDown(this.ghost)) { this.ghost.posY++; }
};


module.exports = Single;

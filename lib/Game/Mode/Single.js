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
  this.clearedLines = 0;
  this.holdType;
  this.holdThisTurn = false;
  //Scoring ( 1, 2, 3 and 4 lines)
  var scoring = [40, 100, 300, 1200];

  // Todo: make this debug info optional
  // this.scr.write(2, 60, 'move L'+t[0] + ':'+ (t[1]*0.000001));

  //this.moveGhost();
  // this.scr.startListeningKeyEvents();
  this.loop.createInterval(1000, this.gameStep.bind(this));

  //Accelerate the game on Keydown
  this.scr.removeAllListeners('keydown');
  this.scr.on('keydown', (function(key) {
    //block more keys until next step is done
    //this.scr.blockKeys = true;
    //TODO: refactor this ugly key to action code
    switch (key) {
      case 'space':
        this.action = 'drop';
        break;
      case 'c':
        this.action = 'hold';
        break;
      case 'escape':
        this.quit();
        break;
      default:
        this.action = key;
        break;
    }
    if (this.loop.speed != this.fast) {
      this.loop.createInterval(this.fast, this.gameStep.bind(this));
    }
  }).bind(this));
  //Slow it down again on keyup
  this.field.on('clearedLines', function(lines) {
    this.clearedLines += lines;
    this.scr.printLines(this.scr.wPosX, this.scr.wPosY + 17, this.clearedLines);

  }.bind(this));

  this.scr.clear();
  // Init Screen inidcators
  this.scr.printHold(this.scr.wPosX, this.scr.wPosY);
//  this.scr.printTime(this.scr.wPosX, this.scr.wPosY + 9);
//  this.scr.printNext(this.scr.wPosX + 43, this.scr.wPosY);
//  this.scr.printLines(this.scr.wPosX, this.scr.wPosY + 17, this.clearedLines);
  this.scr.render(this.field, this.tetro, this.ghost);
};

Single.prototype.gameStep = function() {
  this.scr.blockKeys = false;
  // Call the function with pressed key name
  if (this.action && typeof this[this.action] === 'function') {
    this[this.action]();
    this.action = null;
  } else {
  // this.down();
    if (this.loop.speed == this.fast)
      this.loop.createInterval(this.slow, this.gameStep.bind(this));
  }
  this.field.clearComplete()
  process.nextTick(function() {
    this.scr.render(this.field, this.tetro, this.ghost);
  }.bind(this));
};

Single.prototype.quit = function() {
  clearInterval(this.loop.interval);
  this.scr.close();
  process.exit(0);
};

Single.prototype.down = function() {
  var randomnumber;
  if (this.field.collideDown(this.tetro)) {
    this.field.update(this.tetro);
    this.holdThisTurn = false;
    this.tetro.resetTo(Math.floor(Math.random() * 7));
    this.ghost.type = this.tetro.type;
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
  if (this.field.collision(this.tetro, 3) === false) {
    this.tetro.posX = this.tetro.posX - 1;
    this.ghost.posY = this.tetro.posY;
    this.ghost.posX = this.ghost.posX - 1;
    this.dropGhost();
  }
};

Single.prototype.drop = function() {
  this.scr.blockKeys = true;
  while (!this.field.collideDown(this.tetro)) {
    this.tetro.posY++;
  }
  this.down();
};

Single.prototype.hold = function() {
  var next;
  if (!this.holdThisTurn) {
    this.holdThisTurn = true;
    next = (this.holdType) ? this.holdType : Math.floor(Math.random() * 7);
    this.holdType = this.tetro.type;
    this.tetro.resetTo(next);
    this.ghost.resetTo(next);
    this.scr.printHold(this.scr.wPosX, this.scr.wPosY, this.holdType);
  } else {
    this.scr.printHold(this.scr.wPosX, this.scr.wPosY);
  }
};

Single.prototype.dropGhost = function() {
  while (!this.field.collideDown(this.ghost)) { this.ghost.posY++; }
};


module.exports = Single;

// mock node.js process.on
process = {
  on: function() {}
};
// 'use strict';
var events = require('events');
var Canvas = function() {
  this.blockKeys = false;
  this.bgCanvas = document.getElementById('background');
  this.fgCanvas = document.getElementById('foreground');
  this.bgctx = this.bgCanvas.getContext('2d');
  this.fgctx = this.fgCanvas.getContext('2d');
  this.fgctx.font="20px Georgia";
  //Initial colors
  this.fgctx.fillStyle = '#000066';
  this.bgctx.fillStyle = '#006600';

  //Input
  this.keyMap = {
    '38': 'up',
    '40': 'down',
    '37': 'left',
    '39': 'right',
    '13': 'enter',
    '32': 'space'
  };
  this.lastKey = null;
  this.wins = [
    { 
      clear: function() {
        //this.bgCanvas.width = this.bgCanvas.width;
      },
      refresh: function() {
      }
    }
  ];
};

module.exports = Canvas;

Canvas.prototype = new events.EventEmitter();

Canvas.prototype.hello = function() {
  console.log('I\'m browser');
};

Canvas.prototype.startListeningKeyEvents = function() {
  console.log('starting listnening');
  document.addEventListener('keydown', function(e) {
    console.log(e.keyCode);
    if (!this.blockKeys) {
      if (this.keyMap[e.keyCode]) {
        this.emit('keydown', this.keyMap[e.keyCode]);
      }
    }
  }.bind(this), false);
  //TODO: this is candidate to be deleted
  document.addEventListener('keyup', function(e) {
    this.emit('keyup');
  }.bind(this), false);
};

Canvas.prototype.render = function(bg, fg) {
  if (bg) this.printBgObject(bg);
  if (fg) this.printFgObject(fg);
  // requestAnimationFrame(this.render);
};

Canvas.prototype.printBgObject = function(pObject) {
  var posX = pObject.posX || 0;
  var posY = pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var x = 0, y = 0;
  // Trick to clean canvas faster #performance
  y = matrix.length;
  this.bgCanvas.width = this.bgCanvas.width;
  while (y--) {
    x = matrix[0].length;
    while (x--) {
      if (matrix[y][x] != 0) {
        this.bgctx.fillRect((posX + x) * 10, (posY + y) * 10, 10, 10);
      }
    }
  }
};

Canvas.prototype.printFgObject = function(pObject) {
  var posX = pObject.posX || 0;
  var posY = pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var x = 0, y = 0;
  // Trick to clean canvas faster #performance
  this.fgCanvas.width = this.fgCanvas.width;
  y = matrix.length;
  while (y--) {
    x = matrix[0].length;
    while (x--) {
      if (matrix[y][x] != 0) {
        this.fgctx.fillRect((posX + x) * 10, (posY + y) * 10, 10, 10);
      }
    }
  }
};

Canvas.prototype.menu = function(options, highlight, x, y) {
  var posX = x || 0;
  var posY = y || 0;
  var selected = highlight || 0;
  var i, msg;
  this.fgCanvas.width = this.fgCanvas.width;
  for (i in options) {
    posY = posY + 2;
    if (selected == i) {
      msg = '>' + options[i].title;
//      this.wins[0].attrset(nc.colorPair(2));
    } else {
//      this.wins[0].attrset(nc.colorPair(1));
      msg = options[i].title;
    }
    this.fgctx.fillText(msg, posX, posY);
  }
//  this.wins[0].refresh();
};


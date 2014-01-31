'use strict';
var events = require('events');
var charm = require('charm')(process.stdout);
var keypress = require('keypress');
charm.cursor(false);
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();


var Charm = function() {
  var self = this;
  this.blockKeys = false;
  // KeyMap as property os now we can redefine keys "inmemory"
  // Todo: later let user save config to a file/localStorage
  this.colorMap = { blue: 1, red: 2, yellow: 3, gree: 4 };
};

module.exports = Charm;
Charm.prototype = new events.EventEmitter();

/*
 * rePaint
 * @fg {array} Paint this array to the foreground window
 * @bg {array} Paint this array to the background window
 */
Charm.prototype.render = function(bg, fg, gh) {
  charm.erase('screen');
  this.printBgObject(bg);
  this.printFgObject(fg);
  //this.printFgObject(gh, true);
};

Charm.prototype.startListeningKeyEvents = function() {
  process.stdin.on('keypress', function(ch, key) {
    this.emit('keydown', key.name);
  }.bind(this));
};

Charm.prototype.switchColor = function(pair) {
  var pairs = [
    [7, 0], // Selected color
    [201, 5],  // Main color
    [243, 244], // Background
    [30, 33], // I tetromino
    [3, 172], // J
    [21, 4], // L
    [185, 184], //O
    [35, 34], // S
    [201, 93], // T
    [125, 124],// Z
    [0, 0]
  ];
  charm.foreground(pairs[pair][0]);
  charm.background(pairs[pair][1]);
};


Charm.prototype.printBgObject = function(pObject) {
  var posX = pObject.posX || 0;
  var posY = pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var x = 0, y = 0;
  y = matrix.length;
  while (y--) {
    x = matrix[0].length;
    while (x--) {
      if (matrix[y][x] != 0) {
        this.switchColor(matrix[y][x] + 2);
        charm.position((posX + x) * 2, posY + y);
        charm.write('[]');
      } else {
        this.switchColor(10);
        charm.position((posX + x) * 2, posY + y);
        charm.write('  ');
      }
    }
  }
};

Charm.prototype.printFgObject = function(pObject, flag) {
  var posX = pObject.posX || 0;
  var posY = pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var x = 0, y = 0;
  var ghost = flag || false;
  y = matrix.length;
  while (y--) {
    x = matrix[0].length;
    while (x--) {
      if (matrix[y][x] != 0) {
        charm.position((posX + x) * 2, posY + y);
        charm.write('[]');
      }
    }
  }
}

Charm.prototype.menu = function(options, highlight, x, y) {
  var posX = x || 0;
  var posY = y || 0;
  var selected = highlight || 0;
  var i, msg;
  charm.erase('screen');
  for (i in options) {
    posY = posY + 2;
    if (selected == i) {
      this.switchColor(0);
      msg = '>' + options[i].title;
    } else {
      this.switchColor(1);
      msg = options[i].title;
    }
    charm.position(posX, posY);
    charm.write(msg);
  }
};

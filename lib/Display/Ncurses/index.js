'use strict';
var events = require('events');
var nc = require('ncurses');

var Ncurses = function() {
  var self = this;
  this.blockKeys = false;
  this.wins = [];
  this.wins.push(new nc.Window());

  // KeyMap as property os now we can redefine keys "inmemory"
  // Todo: later let user save config to a file/localStorage
  this.keyMap = {
    '259': 'up', '258': 'down', '260': 'left', '261': 'right',
    '32': 'space', '10': 'enter', '27': 'esc' };
  this.colorMap = { blue: 1, red: 2, yellow: 3, gree: 4 };
  nc.showCursor = false;
  var LILA = 93;
  nc.colorPair(1, nc.colors.WHITE, nc.colors.BLACK);
  // Main Color 
  nc.colorPair(2, 201, LILA);
  //background
  nc.colorPair(3, 243, 244);
  //cyan I tetromino
  nc.colorPair(4, 30, 33);
  //orange J
  nc.colorPair(6, 3, 172);
  //blue L
  nc.colorPair(5, 21, 4);
  //yellow O  
  nc.colorPair(7, 185, 184);
  // green s
  nc.colorPair(8, 35, 34);
  // purple T
  nc.colorPair(9, 201, LILA);
  //red z
  nc.colorPair(10, 125, 124);

  this.wins[0].attrset(nc.colorPair(1));
};

module.exports = Ncurses;

Ncurses.prototype = new events.EventEmitter();

/*
 * rePaint
 * @fg {array} Paint this array to the foreground window
 * @bg {array} Paint this array to the background window
 */
Ncurses.prototype.render = function(bg, fg) {
  this.wins[0].attrset(nc.colorPair(2));
  this.wins[0].clear();
  this.printBgObject(bg);
  this.printFgObject(fg);
//  this.print(fg);
  this.wins[0].refresh();
};

Ncurses.prototype.startListeningKeyEvents = function() {
  var self = this;
  this.wins[0].on('inputChar', function(charKey, charNum, isKey) {
    if (self.keyMap[charNum]) {
      self.emit('keydown', self.keyMap[charNum], charNum);
    } else {
      self.emit('keydown', charNum + ':'+charNum+':'+isKey);
    }
  });
};

Ncurses.prototype.log = function(msg) {
  this.wins[0].addstr(0, 0, '' + nc.maxColorPairs);
  this.wins[0].close();
  console.log(msg);
  process.exit(0);
};

Ncurses.prototype.close = function() {
  this.wins[0].close();
};

Ncurses.prototype.print = function(pObject, transparent) {
  var posX = pObject.posX || 0;
  var posY = pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var color = this.colorMap[pObject.color] || 7;
  var i = 0, j = 0;
  var transparent = transparent || true;
  //this.wins[0].attrset(nc.colorPair(2));
  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== 0) {
        if (!transparent) color = pObject.colorMap[posY + i][posX + j];
        this.wins[0].attrset(nc.colorPair(color));
        this.wins[0].addstr(posY + i, posX + j, ' ');
      }
    }
  }
};

Ncurses.prototype.printBgObject = function(pObject) {
  var posX = pObject.posX || 0;
  var posY = pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var x = 0, y = 0;
  y = matrix.length;
  while (y--) {
    x = matrix[0].length;
    while (x--) {
      if (matrix[y][x] != 0) {
        this.wins[0].attrset(nc.colorPair(2));
        this.wins[0].addstr(posY + y, (posX + x) * 2, '[]');
      } else {
        this.wins[0].attrset(nc.colorPair(3));
        this.wins[0].addstr(posY + y, (posX + x) * 2, '[]');
      }
    }
    this.wins[0].refresh();
  }
};

Ncurses.prototype.printFgObject = function(pObject, flag) {
  var posX = pObject.posX || 0;
  var posY = pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var x = 0, y = 0;
  y = matrix.length;
  this.wins[0].attrset(nc.colorPair(pObject.type + 4));
  while (y--) {
    x = matrix[0].length;
    while (x--) {
      if (matrix[y][x] != 0) {
        this.wins[0].addstr(posY + y, (posX + x) * 2, '[]');
      }
    }
    this.wins[0].refresh();
  }
};

Ncurses.prototype.menu = function(options, highlight, x, y) {
  var posX = x || 0;
  var posY = y || 0;
  var selected = highlight || 0;
  var i, msg;
  this.wins[0].clear();
  for (i in options) {
    posY = posY + 2;
    if (selected == i) {
      msg = options[i].title;
      this.wins[0].attrset(nc.colorPair(2));
    } else {
      this.wins[0].attrset(nc.colorPair(1));
      msg = options[i].title;
    }
    this.wins[0].addstr(posY, posX, msg);
  }
  this.wins[0].refresh();
};

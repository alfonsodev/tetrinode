'use strict';
var events = require('events');
var nc = require('ncurses');

var Ncurses = function() {
  var self = this;
  this.blockKeys = false;
  this.mainWin = new nc.Window();
  // this.bgw = new nc.Window(12, 20);
  // KeyMap as property os now we can redefine keys "inmemory"
  // Todo: later let user save config to a file/localStorage
  this.keyMap = {
    '259': 'up', '258': 'down', '260': 'left', '261': 'right',
    '32': 'space', '10': 'enter', '27': 'esc' };
  this.colorMap = { blue: 1, red: 2, yellow: 3, gree: 4 };
  nc.showCursor = false;
  nc.colorPair(1, nc.colors.WHITE, nc.colors.BLACK);
  nc.colorPair(2, nc.colors.BLACK, nc.colors.WHITE);

  this.mainWin.attrset(nc.colorPair(1));
};

module.exports = Ncurses;

Ncurses.prototype = new events.EventEmitter();

/*
 * rePaint
 * @fg {array} Paint this array to the foreground window
 * @bg {array} Paint this array to the background window
 */
Ncurses.prototype.render = function(bg, fg) {
  this.mainWin.attrset(nc.colorPair(2));
  this.mainWin.clear();
  this.printBgObject(bg);
  this.printFgObject(fg);
//  this.print(fg);
  this.mainWin.refresh();
};

Ncurses.prototype.startListeningKeyEvents = function() {
  var self = this;
  this.mainWin.on('inputChar', function(charKey, charNum, isKey) {
    if (self.keyMap[charNum]) {
      self.emit('keydown', self.keyMap[charNum], charNum);
    } else {
      self.emit('keydown', charNum + ':'+charNum+':'+isKey);
    }
  });
};

Ncurses.prototype.log = function(msg) {
  this.mainWin.addstr(0, 0, '' + nc.maxColorPairs);
  this.mainWin.close();
  console.log(msg);
  process.exit(0);
};

Ncurses.prototype.close = function() {
  this.mainWin.close();
};

Ncurses.prototype.print = function(pObject, transparent) {
  var posX = pObject.posX || 0;
  var posY = pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var color = this.colorMap[pObject.color] || 7;
  var i = 0, j = 0;
  var transparent = transparent || true;
  //this.mainWin.attrset(nc.colorPair(2));
  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== 0) {
        if (!transparent) color = pObject.colorMap[posY + i][posX + j];
        this.mainWin.attrset(nc.colorPair(color));
        this.mainWin.addstr(posY + i, posX + j, ' ');
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
        this.mainWin.addstr(posY + y, posX + x, ' ');
      }
    }
    this.mainWin.refresh();
  }
};

Ncurses.prototype.printFgObject = function(pObject, flag) {
  var posX = pObject.posX || 0;
  var posY = pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var x = 0, y = 0;
  y = matrix.length;
  while (y--) {
    x = matrix[0].length;
    while (x--) {
      if (matrix[y][x] != 0) {
        this.mainWin.addstr(posY + y, posX + x, ' ');
      }
    }
    this.mainWin.refresh();
  }
};

Ncurses.prototype.menu = function(options, highlight, x, y) {
  var posX = x || 0;
  var posY = y || 0;
  var selected = highlight || 0;
  var i, msg;
  this.mainWin.clear();
  for (i in options) {
    posY = posY + 2;
    if (selected == i) {
      msg = options[i].title;
      this.mainWin.attrset(nc.colorPair(2));
    } else {
      this.mainWin.attrset(nc.colorPair(1));
      msg = options[i].title;
    }
    this.mainWin.addstr(posY, posX, msg);
  }
  this.mainWin.refresh();
};

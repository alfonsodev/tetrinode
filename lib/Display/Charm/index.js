'use strict';
var events = require('events');
var charm = require('charm')(process.stdout);
var keypress = require('keypress');
charm.cursor(false);
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

var Charm = function(width, height, x, y) {
  var self = this;
  this.blockKeys = false;
  // KeyMap as property os now we can redefine keys "inmemory"
  // Todo: later let user save config to a file/localStorage
  this.colorMap = { blue: 1, red: 2, yellow: 3, gree: 4 };

  this.wPosX = x || 0;
  this.wPosY = y || 0;
  this.wWidth = width || 80;
  this.wHeight = height || 40;
  charm.reset();
  charm.cursor(false);
 };

module.exports = Charm;
Charm.prototype = new events.EventEmitter();

/*
 * rePaint
 * @fg {array} Paint this array to the foreground window
 * @bg {array} Paint this array to the background window
 */
Charm.prototype.render = function(bg, fg, gh) {
  this.switchColor(10);
  this.clear();
  this.printFgObject(bg, 16, 3);
  if (gh) this.printFgObject(gh, 16, 3, true);
  this.printFgObject(fg, 16, 3);
};


Charm.prototype.clear = function() {
  var y = this.wPosY + this.height;
  while (y--) {
    charm.position(this.wPosX + 14, y);
    charm.delete('char', this.wWidth - 14);
  }
};

Charm.prototype.startListeningKeyEvents = function() {
  process.stdin.on('keypress', function(ch, key) {
    if (!this.blockKeys) this.emit('keydown', key.name);
  }.bind(this));
};

Charm.prototype.switchColor = function(pair) {
  var pair = (pair) ? pair : 0;
  var pairs = [
    [7, 0], // Selected color
    [52, 51], // I
    [21, 4], // L
    [3, 172], // J
    [185, 184], //O
    [35, 34], // S
    [201, 93], // T
    [125, 124],// Z
    [0, 0], // Ghost
    [30, 33], // Bg block
    [201, 5],  // Main color
    [243, 244] // Background

  ];
  charm.foreground(pairs[pair][0]);
  charm.background(pairs[pair][1]);
};


Charm.prototype.printBgObject = function(pObject, leftPadding, topPadding) {
  var posX = pObject.posX || 0;
  var posY = pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var x = 0, y = 0;
  var leftPadding = leftPadding || 0;
  var topPadding = topPadding || 0;
  var positionY;
  var positionX;
  y = matrix.length;
  while (y--) {
    x = matrix[0].length;
    while (x--) {
      positionX = this.wPosX + leftPadding + ((posX + x) * 2 + 1);
      positionY = this.wPosY + topPadding + posY + y;
      charm.position(positionX, positionY);
      if (matrix[y][x] != 0) {
        this.switchColor(matrix[y][x]);
        charm.write('[]');
      } else {
        this.switchColor(8);
        charm.write('..');
      }
    }
  }
};

Charm.prototype.printFgObject = function(pObject, leftPadding, topPadding, ghost) {
  var posX = pObject.posX || 0;
  var posY = pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var x = 0, y = 0;
  var leftPadding = leftPadding || 0;
  var topPadding = topPadding || 0;
  var ghost = ghost || false;
  var positionX;
  var positionY;
  var dynamic = (!pObject.hasOwnProperty('type')); //Tetromino vs Playfield
  y = matrix.length;
  if (!ghost) {
    this.switchColor(pObject.type + 1);
  } else {
    this.switchColor(0);
  }

  while (y--) {
    x = matrix[0].length;
    while (x--) {

      positionX = this.wPosX + leftPadding + ((posX + x) * 2 + 1);
      positionY = this.wPosY + topPadding + posY + y;
      charm.position(positionX, positionY);
      if (matrix[y][x] != 0) {
        if (dynamic) this.switchColor(matrix[y][x]);
        charm.write('[]');
      } else if (dynamic) {
        this.switchColor(8);
        charm.write('..');
      }
    }
  }
};

Charm.prototype.menu = function(options, highlight, x, y) {
  var posX = x || 0;
  var posY = y || 0;
  var selected = highlight || 0;
  var i, msg;
  this.clear();
  for (i in options) {
    posY = posY + 2;
    if (selected == i) {
      this.switchColor(0);
      msg = '>' + options[i].title;
      charm.position(this.wPosX + posX, this.wPosY + posY);
      charm.write(msg);
    } else {
      this.switchColor(1);
      msg = options[i].title;
      charm.position(this.wPosX + posX, this.wPosY + posY);
      charm.write(msg);
    }
    this.switchColor(10);
  }
};

Charm.prototype.printHold = function(x, y, type) {
  var self = this;
  var color = 11;
  var x = x || this.wPosX;
  var y = y || this.wPosY; 
  var type = type || null;
  var printBlocks = function(x, y, num, color, space) {
    var blocks = '';
    var symbol = (!space) ? '[]' : '  ';
    self.switchColor(color);
    while (num--) blocks += symbol;
    charm.position(x, y);
    charm.write(blocks);
  };
  printBlocks(x, y + 1, 7, color);
  printBlocks(x, y + 2, 1, color);
  this.switchColor(0); charm.write('   HOLD     ');
  printBlocks(x + 13, y + 2, 1, color);
  printBlocks(x, y + 3, 7, color);
  printBlocks(x, y + 4, 1, color);
  printBlocks(x + 3, y + 4, 5, 0, true);
  printBlocks(x + 13, y + 4, 1, color);
  printBlocks(x, y + 5, 1, color);
  if (typeof type != null) {
  //  charm.display('blink');
    charm.right(1);charm.delete('char', 5);
    this.switchColor(0); charm.write('  ');
    this.switchColor(type + 3); charm.write('   ');
    if(type === 0) {  charm.write(' '); }
    
  }
   // charm.display('reset');
    this.switchColor(0); charm.write(' ');
    printBlocks(x + 13, y + 5, 1, color);


  printBlocks(x, y + 6, 1, color);
  printBlocks(x + 3, y + 6, 5, 0, true);
  printBlocks(x + 13, y + 6, 1, color);

  printBlocks(x, y + 7, 1, color);
  printBlocks(x + 3, y + 7, 5, 0, true);
  printBlocks(x + 13, y + 7, 1, color);

  printBlocks(x, y + 8, 7, color);

};

Charm.prototype.printTime = function(x, y) {
  var self = this;
  var color = 11;
  var printBlocks = function(x, y, num, color, space) {
    var blocks = '';
    var symbol = (!space) ? '[]' : '  ';
    self.switchColor(color);
    while (num--) blocks += symbol;
    charm.position(x, y);
    charm.write(blocks);
  };
  printBlocks(x, y + 1, 7, color);

  printBlocks(x, y + 2, 1, color);
  this.switchColor(0); charm.write('   TIME     ');
  printBlocks(x + 13, y + 2, 1, color);

  printBlocks(x, y + 3, 7, color);

  printBlocks(x, y + 4, 1, color);
  printBlocks(x + 3, y + 4, 5, 0, true);
  printBlocks(x + 13, y + 4, 1, color);

  printBlocks(x, y + 5, 1, color);
//  charm.display('blink');
  this.switchColor(0); charm.write('   02:00     ');
 // charm.display('reset');
  printBlocks(x + 13, y + 5, 1, color);

  printBlocks(x, y + 6, 1, color);
  printBlocks(x + 3, y + 6, 5, 0, true);
  printBlocks(x + 13, y + 6, 1, color);

  printBlocks(x, y + 7, 7, color);
};

Charm.prototype.printLines = function(x, y, numLines) {
  var self = this;
  var color = 11;
  var numLines = numLines || 0;
  var printBlocks = function(x, y, num, color, space) {
    var blocks = '';
    var symbol = (!space) ? '[]' : '  ';
    self.switchColor(color);
    while (num--) blocks += symbol;
    charm.position(x, y);
    charm.write(blocks);
  };
  printBlocks(x, y + 1, 7, color);

  printBlocks(x, y + 2, 1, color);
  this.switchColor(0); charm.write('   LINES    ');
  printBlocks(x + 13, y + 2, 1, color);

  printBlocks(x, y + 3, 1, color);
  this.switchColor(0); charm.write(' CLEARED  ');
  printBlocks(x + 13, y + 3, 1, color);


  printBlocks(x, y + 4, 7, color);

  printBlocks(x, y + 5, 1, color);
  printBlocks(x + 3, y + 5, 5, 0, true);
  printBlocks(x + 13, y + 5, 1, color);

  printBlocks(x, y + 6, 1, color);
  this.switchColor(0); charm.write('   ' + numLines+ '     ');
  printBlocks(x + 13, y + 6, 1, color);

  printBlocks(x, y + 7, 1, color);
  printBlocks(x + 3, y + 7, 5, 0, true);
  printBlocks(x + 13, y + 7, 1, color);

  printBlocks(x, y + 8, 7, color);
};

Charm.prototype.printNext = function(x, y) {
  var self = this;
  var color = 11;
  var printBlocks = function(x, y, num, color, space) {
    var blocks = '';
    var symbol = (!space) ? '[]' : '  ';
    self.switchColor(color);
    while (num--) blocks += symbol;
    charm.position(x, y);
    charm.write(blocks);
  };
  printBlocks(x, y + 1, 7, color);

  printBlocks(x, y + 2, 1, color);
  this.switchColor(0); charm.write('   NEXT    ');
  printBlocks(x + 12, y + 2, 1, color);
  printBlocks(x, y + 3, 7, color);
  printBlocks(x, y + 4, 1, color);
  printBlocks(x + 3, y + 4, 5, 0, true);
  printBlocks(x + 12, y + 4, 1, color);

  printBlocks(x, y + 5, 1, color);
  printBlocks(x + 3, y + 5, 5, 0, true);
  printBlocks(x + 12, y + 5, 1, color);

  printBlocks(x, y + 6, 1, color);
  printBlocks(x + 3, y + 6, 5, 0, true);
  printBlocks(x + 12, y + 6, 1, color);

  printBlocks(x, y + 7, 1, color);
  printBlocks(x + 3, y + 7, 5, 0, true);
  printBlocks(x + 12, y + 7, 1, color);

  printBlocks(x, y + 8, 7, color);


};

Charm.prototype.printHold = function(x, y, holdType) {

  var hold = {
    posX: 0,
    posY: 0,
    holdType: holdType || 1,
    getMatrix: function() {
      var m = [
        [9, 9, 9, 9, 9, 9, 9, 9],
        [9, 0, 0, 0, 0, 0, 0, 9],
        [9, 9, 9, 9, 9, 9, 9, 9],
        [9, 0, 0, 0, 0, 0, 0, 9]
      ];
      switch (this.holdType + 1) {
        case 1:
          m.push([9, 0, 0, 0, 0, 0, 0, 9]);
          m.push([9, 0, 1, 1, 1, 1, 0, 9]);
          break;
        case 2:
          m.push([9, 0, 2, 0, 0, 0, 0, 9]);
          m.push([9, 0, 2, 2, 2, 0, 0, 9]);
          break;
        case 3:
          m.push([9, 0, 3, 3, 3, 0, 0, 9]);
          m.push([9, 0, 0, 0, 3, 0, 0, 9]);
          break;
        case 4:
          m.push([9, 0, 0, 4, 4, 0, 0, 9]);
          m.push([9, 0, 0, 4, 4, 0, 0, 9]);
          break;
        case 5:
          m.push([9, 0, 0, 5, 5, 0, 0, 9]);
          m.push([9, 0, 5, 5, 0, 0, 0, 9]);
          break;
        case 6:
          m.push([9, 0, 0, 6, 0, 0, 0, 9]);
          m.push([9, 0, 6, 6, 6, 0, 0, 9]);
          break;
        case 7:
          m.push([9, 0, 7, 7, 0, 0, 0, 9]);
          m.push([9, 0, 0, 7, 7, 0, 0, 9]);
          break;
      }

      m.push([9, 0, 0, 0, 0, 0, 0, 9]);
      m.push([9, 9, 9, 9, 9, 9, 9, 9]);
      return m;
    }
  };
  this.printFgObject(hold, 0, 1);
};

Charm.prototype.close = function() {
  charm.reset();
};


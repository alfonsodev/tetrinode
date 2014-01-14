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
    '259': 'up', '258': 'down', '260': 'left', '261': 'right'
  };
  this.colorMap = { blue:1, red:2, yellow:3, gree:4 };
  nc.showCursor = false;
  nc.colorPair(1, 5, 3);


  this.mainWin.attrset(nc.colorPair(1));
//  this.mainWin.attrset(nc.colorPair(2));
};

Ncurses.prototype = new events.EventEmitter();

/*
 * rePaint
 * @fg {array} Paint this array to the foreground window
 * @bg {array} Paint this array to the background window
 */
Ncurses.prototype.render = function(bg, fg) {
  this.mainWin.clear();
  this.printBgObject(bg);
  this.printFgObject(fg);
//  this.print(fg); 
  this.mainWin.refresh();
};

/*
 *
 */
Ncurses.prototype.startListeningKeyEvents = function() {
  var keyUp = null;  
  var self = this;
  this.mainWin.on('inputChar', function(charKey, charNum, isKey) {
    if(!this.blockKey && self.keyMap[charNum]) {
      self.emit(self.keyMap[charNum]);
    } 
  });
};

Ncurses.prototype.log = function(msg) {
  this.mainWin.addstr(0, 0, '' + nc.maxColorPairs);
  this.mainWin.close();
  console.log(msg);
  process.exit(0);
};

Ncurses.prototype.close = function(){
  this.mainWin.close();
}

Ncurses.prototype.print = function(pObject, transparent) {
    var posX = pObject.posX || 0;
    var posY =  pObject.posY || 0;
    var matrix = pObject.getMatrix() || [0];
    var color = this.colorMap[pObject.color] || 7;
    var i=0, j=0;
    var transparent = transparent || true;
    //this.mainWin.attrset(nc.colorPair(2));
    for (i=0; i < matrix.length; i++) {
        for (j=0; j < matrix[i].length; j++) {
            if (matrix[i][j]===0) {
                if(!transparent) { //if printing playboard
                    this.mainWin.addstr(posY+i, posX+j, ' ');
                }
            } else {
                if(!transparent) color = pObject.colorMap[posY+i][posX+j];
                this.mainWin.attrset(nc.colorPair(color));
                this.mainWin.addstr(posY+i,posX+j, ' ');
            }
        }
    }
};

Ncurses.prototype.printBgObject = function(pObject) {
    var posX = pObject.posX || 0;
    var posY =  pObject.posY || 0;
    var matrix = pObject.getMatrix() || [0];
    var x=0, y=0;
    y = matrix.length;
    while(y--) {
      x = matrix[0].length;
      while(x--) {
        if (matrix[y][x]!=0) {
          this.mainWin.addstr(posY+y, posX+x, ' ');
        }
      }
    }
};

Ncurses.prototype.printFgObject = function(pObject) {
  var posX = pObject.posX || 0;
  var posY =  pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var x=0, y=0;
  y = matrix.length;
  while(y--) {
    x = matrix[0].length;
    while(x--) {
      if (matrix[y][x]!=0) {
        this.mainWin.addstr(posY+y, posX+x, ' ');
      }
    }
  }
};

module.exports = Ncurses;


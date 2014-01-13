var events = require('events');
var nc = require('ncurses');

module.exports = Ncurses = function() {
  debugger;
  var self = this;
  this.mainWin = new nc.Window();
//  this.bgw = new nc.Window(12, 20);
  // KeyMap as property os now we can redefine keys "inmemory"
  // Todo: later let user save config to a file/localStorage
  this.keyMap = {
    '259': 'up', '258': 'down', '260': 'left', '261': 'right'
  };
  this.colorMap = { };
  nc.showcursor = false;
  nc.colorPair(1, 2, 3);
  nc.colorPair(2, 2, 0);
  this.mainWin.attrset(nc.colorPair(1));
  // Clears the Terminal before exit
  process.on('SIGINT', function() {
    // clearInterval(loop.interval);
    self.mainWin.addstr(0, 0, '' + nc.maxColorPairs);
    self.mainWin.close();
  });
};

Ncurses.prototype = new events.EventEmitter();
/*
 * rePaint
 * @fg {array} Paint this array to the foreground window
 * @bg {array} Paint this array to the background window
 */
Ncurses.prototype.rePaint = function(fg, bg) {
  scr.mainWin.clear();
  this.mainWin.refresh();
};


/*
 *
 */
Ncurses.prototype.startListeningKeyEvents = function() {
  var keyUp = null;  
  var self = this;
  this.mainWin.on('inputChar', function(charKey, charNum, isKey) {
    if(self.keyMap[charNum]) {
      self.emit(self.keyMap[charNum]);  
    } 
  });
};

Ncurses.prototype.log = function(msg) {
  this.mainWin.addstr(0, 0, '' + nc.maxColorPairs);
  this.mainWin.close();
  console.log(msg);
  process.exit(1);

};

var scr = new Ncurses();
  scr.startListeningKeyEvents();
  scr.mainWin.clear();
  scr.mainWin.addstr(0, 0, 'up!');
  scr.mainWin.refresh();

scr.on('up', function(){
  scr.log('up!');
  scr.mainWin.clear();
  scr.mainWin.addstr(10, 10, 'up!');
  scr.mainWin.refresh();
});


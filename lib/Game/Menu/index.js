'use strict';
var events = require('events');
var Menu = function(display, menuOptions) {
  this.selected = 0;
  this.options = menuOptions;
  this.display = display;
  this.display.startListeningKeyEvents();
  this.display.on('keydown', this.moveCursor.bind(this));
};
Menu.prototype = new events.EventEmitter();
Menu.prototype.show = function() {
  this.display.menu(this.options, this.selected, 0, 0);
};

Menu.prototype.moveCursor = function(key, num) {
  if (key === 'down' && this.selected < this.options.length - 1) {
    this.selected++;
  } else if (key === 'up' && this.selected > 0) {
    this.selected--;
  } else if (key === 'enter') {
    this.emit('selection', this.options[this.selected]);
   // this.display.removeAllListeners('keydown');
  }
  this.show();
};

module.exports = Menu;

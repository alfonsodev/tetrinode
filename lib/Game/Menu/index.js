'use strict';

var Menu = function(display, loop) {
  this.display = display;
  this.display.startListeningKeyEvents();
};

Menu.prototype.show = function(options, callback) {
  var selected = 0;
  this.scr.on('keydown', function(key) {
    if (key === 'down' && selected < options.length) {
      selected++;
    } else if (key === 'up' && selected > 0) {
      selected--;
    }
  });

  this.display.menu(options, selected, 0, 0);
};
module.exports = Menu;


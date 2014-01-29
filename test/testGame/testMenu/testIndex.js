'use strict';
var assert = require('assert');
var Menu = require('../../../lib/Game/Menu');
var events = require('events');
var debug = require('debug')('tetrinode-test-display');
var FakeDisplay = function() {
  debug('FakeDisplay constructor');
};
//Mock display behaviour
FakeDisplay.prototype = new events.EventEmitter();
FakeDisplay.prototype.startListeningKeyEvents = function() {
  debug('startListeningKeyEvents..');
};
FakeDisplay.prototype.menu = function(options, selected, x, y) {
  debug('display menu!');
  this.emit('showMenu', selected);
};


describe('Menu class', function() {
  describe('constructor behaviour', function() {
    it('moves cursor on keydowd (up and down)', function() {
      var display = new FakeDisplay();
      var options = ['Sinle Player', 'Multiplayer', 'exit'];
      var menu = new Menu(display, options);
      display.emit('keydown', 'down');
      setTimeout(function() {
        assert.equal(1, menu.selected);
        done();
      }, 50);
    });
  });

  describe('show method', function() {
    it('should call display with options, selected and posXy ', function(done) {
      var display = new FakeDisplay();
      var options = ['Sinle Player', 'Multiplayer', 'exit'];
      var menu = new Menu(display, options);
      display.on('showMenu', function(selected) {
        if (selected === 0 && options.length === 3) {
          done();
        } else {
          done(new Error('selected value ' + selected + ' is not correct'));
        }
      });
      menu.show();
    });

    describe('omveCursor method', function() {
      it('should move cursor in the limits', function() {
        var display = new FakeDisplay();
        var options = ['Sinle Player', 'Multiplayer', 'exit'];
        var menu = new Menu(display, options);

        menu.moveCursor('up');
        assert.equal(menu.selected, 0);
        menu.moveCursor('down');
        assert.equal(menu.selected, 1);
        menu.moveCursor('down');
        assert.equal(menu.selected, 2);
        menu.moveCursor('down');
        assert.equal(menu.selected, 2);
        menu.moveCursor('up');
        assert.equal(menu.selected, 1);
        menu.moveCursor('up');
        assert.equal(menu.selected, 0);
      });
    });
  });
});

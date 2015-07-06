'use strict';

/*
 * Loop
 * Game loop class
 */
var Loop = function() {
  this.speed = 0;
  this.interval = null;
  this.keyup = null;
};

module.exports = Loop;

/*
 * createInterval
 * @spped is the timeInterval in miliseconds
 * @logic execute a game step
 * @render render the game
 *
 */
Loop.prototype.createInterval = function(speed, callback) {
  if (this.interval) clearInterval(this.interval);
  this.speed = speed;
  this.interval = setInterval((function() {
    callback();
  }).bind(this), this.speed);
};

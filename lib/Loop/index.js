/*
 * Loop
 * Game loop class
 */
var Loop =  function() {
  this.speed = 0;
  this.interval = null;
  this.keyup = null;
};

/*
 * createInterval
 * @spped is the timeInterval in miliseconds
 * @logic execute a game step 
 * @render render the game
 *
 */
Loop.prototype.createInterval = function(speed, callback) {
  var self = this;
  if(this.interval) clearInterval(this.interval);
  this.speed = speed;
  this.interval = setInterval(function() {
    callback();
  }, this.speed);
};

module.exports = Loop;
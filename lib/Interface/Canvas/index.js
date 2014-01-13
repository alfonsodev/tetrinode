var events = require('events');
module.exports = Canvas = function() {
  this.keyMap = {
    '38': 'up',
    '40': 'down',
    '37': 'left',
    '39': 'right'
  };
  console.log('Browser constructor');
};

Canvas.prototype = new events.EventEmitter();

Canvas.prototype.hello = function(){
  console.log('I\'m browser');
};

Canvas.prototype.startListeningKeyEvents = function() {
  console.log('starting listnening')
  var self = this;
  document.addEventListener("keydown", function(e) {
    console.log('keydown!')
   self.emit(self.keyMap[e.keyCode]);

  }, false);

  document.addEventListener("keyup", function(e) {
    self.emit('keyup');
  }, false);
};

Canvas.prototype.rePaint = function() {
  console.log('repainting');
};

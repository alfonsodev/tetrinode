// mock node.js process.on 
process = {
  on: function(){}
};
var events = require('events');
module.exports = Canvas = function() {
//  this.blockKeys = false;
  this.bgCanvas = document.getElementById('background');
  this.fgCanvas = document.getElementById('foreground');
  this.bgctx = this.bgCanvas.getContext('2d');
  this.fgctx = this.fgCanvas.getContext('2d');
  this.pressed = null;
  //Initial colors
  this.fgctx.fillStyle="#000066";
  this.bgctx.fillStyle="#006600";

  //Input
  this.keyMap = {
    '38': 'up',
    '40': 'down',
    '37': 'left',
    '39': 'right'
  };
  this.lastKey = null;
};

Canvas.prototype = new events.EventEmitter();

Canvas.prototype.hello = function(){
  console.log('I\'m browser');
};

Canvas.prototype.startListeningKeyEvents = function() {
  console.log('starting listnening')
  var self = this;
  document.addEventListener("keydown", function(e) {
    if(self.keyMap[e.keyCode]) {
      self.emit('keydown', self.keyMap[e.keyCode]);
      self.pressed = self.keyMap[e.keyCode];
    }
  }, false);

  document.addEventListener("keyup", function(e) {
    self.emit('keyup');
  }, false);
};

Canvas.prototype.render = function(bg,fg) {
  var self = this;
  if(bg)
    this.printBgObject(bg);
  if(fg)
    this.printFgObject(fg);
  //requestAnimationFrame(self.render);

};

Canvas.prototype.printBgObject = function(pObject) {
    this.bgCanvas.width = this.bgCanvas.width; // Trick to clean canvas faster #performance
    var posX = pObject.posX || 0;
    var posY =  pObject.posY || 0;
    var matrix = pObject.getMatrix() || [0];
    var x=0, y=0;
    y = matrix.length;
    while(y--) {
      x = matrix[0].length;
      while(x--) {
        if (matrix[y][x]!=0) {
          this.bgctx.fillRect((posX+x)*10, (posY+y)*10, 10, 10); // Paint the box
        }
      }
    }
};

Canvas.prototype.printFgObject = function(pObject) {
  this.fgCanvas.width = this.fgCanvas.width; // Trick to clean canvas faster #performance
  var posX = pObject.posX || 0;
  var posY =  pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var x=0, y=0;
  y = matrix.length;
  while(y--) {
    x = matrix[0].length;
    while(x--) {
      if (matrix[y][x]!=0) {
        this.fgctx.fillRect((posX+x)*10, (posY+y)*10, 10, 10); // Paint the box
      }
    }
  }
};


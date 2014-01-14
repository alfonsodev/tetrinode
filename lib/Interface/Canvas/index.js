process = {
  on: function(){}
};
var events = require('events');
module.exports = Canvas = function() {
  //Back an foreground canvas context declaration
  var bgCanvas = document.getElementById('background');
//  var fgCanvas = document.getElementById('foreground');
  this.bgctx = bgCanvas.getContext('2d');
 // this.fgctx = bgCanvas.getContext('2d');

  //Initial colors
 // this.fgctx.fillStyle="#000066";
  this.bgctx.fillStyle="#006600";

  //Input
  this.keyMap = {
    '38': 'up',
    '40': 'down',
    '37': 'left',
    '39': 'right'
  };
};

Canvas.prototype = new events.EventEmitter();

Canvas.prototype.hello = function(){
  console.log('I\'m browser');
};

Canvas.prototype.startListeningKeyEvents = function() {
  console.log('starting listnening')
  var self = this;
  document.addEventListener("keydown", function(e) {
   self.emit(self.keyMap[e.keyCode]);
  }, false);

  document.addEventListener("keyup", function(e) {
    self.emit('keyup');
  }, false);
};

Canvas.prototype.render = function(bg) {
  var self = this;
  this.width = this.width; // Trick to clean canvas faster #performance
  requestAnimationFrame(function(){
    self.printObject(bg);
    //console.log(new Date().toString());
  });
};

Canvas.prototype.printObject = function(pObject) {
    var posX = pObject.posX || 0;
    var posY =  pObject.posY || 0;
    var matrix = pObject.getMatrix() || [0];
    var x=0, y=0;
    y = matrix.length ;
    while(y--) {
      x = matrix[0].length;
      while(x--) {
        if (matrix[y][x]!=0) {
          this.bgctx.fillRect((posX+x)*10, (posY+y)*10, 10, 10); // Paint the box
        }
      }
    }
};



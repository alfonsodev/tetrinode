var Logic = function(scr, field, tetro, loop) {
  this.scr = scr;
  this.field = field;
  this.tetro = tetro;
  this.loop = loop;
  this.fast = 70;
  this.slow = 1000;
    // Todo: make this debug info optional
  // this.scr.write(2, 60, 'move L'+t[0] + ':'+ (t[1]*0.000001));

  this.scr.startListeningKeyEvents();
  this.scr.render(this.field, this.tetro);
  this.loop.createInterval(1000, this.gameStep.bind(this));

  //Accelerate the game on Keydown
  this.scr.on('keydown', (function(key) {
    if(this.loop.speed != this.fast) {
      this.loop.createInterval(this.fast, this.gameStep.bind(this));
    }      
  }).bind(this));
  //Slow it down again on keyup
  this.scr.on('keyup', (function(){
    this.loop.createInterval(this.slow, this.gameStep.bind(this));
  }).bind(this));

  this.scr.on('up', function() { console.log('hello'); });
};

Logic.prototype.gameStep = function(){
  // Call the function with pressed key name
  if(this.scr.pressed){
    this[this.scr.pressed]();
  }
  this.scr.render(null, this.tetro);
//  console.log(new Date().toString())
};

Logic.prototype.down = function() {
  console.log('down')
};

Logic.prototype.up= function() {
  console.log('up');
};


Logic.prototype.right = function() {
  if(this.field.collideRight(this.tetro) === false) {
    this.tetro.posX++;
  }
};

Logic.prototype.left = function() {
 console.log('left');
  //this.scr.blockKeys = true;
   if(this.field.collideLeft(this.tetro) === false) {
      this.tetro.posX = this.tetro.posX - 1;
    }
  //this.scr.blockKeys = false;
};

module.exports = Logic;

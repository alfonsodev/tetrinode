var Logic = function(scr, field, tetro, loop) {
  this.scr = scr;
  this.field = field;
  this.tetro = tetro;
  this.loop = loop;
  this.fast = 70;
  this.slow = 1000;
  this.action = null;
  // Todo: make this debug info optional
  // this.scr.write(2, 60, 'move L'+t[0] + ':'+ (t[1]*0.000001));

  this.scr.startListeningKeyEvents();
  this.scr.render(this.field, this.tetro);
  this.loop.createInterval(1000, this.gameStep.bind(this));

  //Accelerate the game on Keydown
  this.scr.on('keydown', (function(key) {
    //block more keys until next step is done
//    this.scr.blockKeys = true;
    this.action = key;
    if(this.loop.speed != this.fast) {
      this.loop.createInterval(this.fast, this.gameStep.bind(this));
    }      
  }).bind(this));
  //Slow it down again on keyup
};

Logic.prototype.gameStep = function(){
  // Call the function with pressed key name
  if(this.action) {
    console.log(this.action);
    this[this.action]();
    this.action = null;
  } else {
    this.down();
    if(this.loop.speed == this.fast)
    this.loop.createInterval(this.slow, this.gameStep.bind(this));
  }
  this.field.clearComplete();
  this.scr.render(this.field, this.tetro);
 // this.scr.blockKeys = false;
};

Logic.prototype.down = function() {
  var randomnumber;
  if(this.field.collideDown(this.tetro)) {
    this.field.update(this.tetro);
    this.tetro.posY = 0;
    this.tetro.posX = 4;
    randomnumber = Math.floor(Math.random()*7),
    this.tetro.type = randomnumber;
  } else {
    this.tetro.posY++;
  }
};

Logic.prototype.up = function() {
  console.log('up');
  this.tetro.rotate(false);
};


Logic.prototype.right = function() {
  if(this.field.collideRight(this.tetro) === false) {
    this.tetro.posX++;
  }
};

Logic.prototype.left = function() {
 console.log('left');
   if(this.field.collideLeft(this.tetro) === false) {
      this.tetro.posX = this.tetro.posX - 1;
    }
};

module.exports = Logic;

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
/*
  document.addEventListener("keydown", function(e) {
    if (e.keyCode == 40 && loop.speed!=70) {
        loop.createInterval(70);
    }
  }, false);
*/
  this.scr.on('keydown', (function(key) {
    if(this.loop.speed != this.fast)
      this.loop.createInterval(this.fast, this.gameStep.bind(this));
  }).bind(this));
  this.scr.on('keyup', (function(){
    this.loop.createInterval(this.slow, this.gameStep.bind(this));
  }).bind(this));

/*
  document.addEventListener("keyup", function(e) {
    if (loop.speed!=1000) {
        loop.createInterval(1000);
    }

  }, false);
*/
  /*
  this.scr.on('down', (function() {
    if(this.loop.keyUp) { clearInterval(this.loop.keyUp); }
    this.loop.createInterval(this.fast, this.gameStep.bind(this));
    this.loop.keyUp = setTimeout((function() { 
      this.loop.createInterval(this.slow, this.gameStep.bind(this)); 
    }).bind(this) , this.fast + 15);
  }).bind(this));
*/
  this.scr.on('up', function() { console.log('hello'); });
};

Logic.prototype.gameStep = function(){
  console.log(new Date().toString())
};

Logic.prototype.down = function() {
//  console.log('down')

};

Logic.prototype.right = function() {
  console.log('right');
//  this.scr.blockKeys = true;
  if(this.field.collideRight(this.tetro) === false) {
    this.tetro.posX++;
  }
 // this.scr.blockKeys = false;
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

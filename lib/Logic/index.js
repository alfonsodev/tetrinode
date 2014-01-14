var Logic = function(scr, field, tetro) {
  this.scr = scr;
  this.field = field;
  this.tetro = tetro;
};

Logic.prototype.moveLeft = function() {
    this.scr.blockKeys = true;
     if(this.field.collideLeft(this.tetro) === false){
        this.tetro.posX--;
//        this.scr.write(2, 15, "posX:      ");
//        this.scr.write(2, 15, "posX: " + this.tetro.posX);
    }
    this.scr.blockKeys = false;
    // Todo: make this debug info optional
    // this.scr.write(2, 60, 'move L'+t[0] + ':'+ (t[1]*0.000001));
}

module.exports = Logic;

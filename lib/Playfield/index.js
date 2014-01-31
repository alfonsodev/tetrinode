'use strict';

var events = require('events');
var util = require('util');

var Playfield = function() {
  this.matrix = [];
  this.width = 12;
  this.height = 23;
  this.color = 3;
  var i = this.height;
  while (i--) {
    this.matrix[i] = [];
    var j = this.width;
    while (j--) {
      if (i == (this.height - 1) ||  j === 0 || j == (this.width - 1) ) {
        this.matrix[i][j] = 1;
      } else {
        this.matrix[i][j] = 0;
      }
    }
  }
};

module.exports = Playfield;

Playfield.prototype = new events.EventEmitter();

Playfield.prototype.collideLeft = function(tetri) {
  var tetriMatrix = tetri.getMatrix();
  var i = tetriMatrix.length;
  var len = tetriMatrix[0].length;
  var j;
  while (i--) {
    j = len;
    while (j--) {
      if (tetriMatrix[i][j] > 0 &&
          this.matrix[tetri.posY + i][(tetri.posX - 1) + j] > 0) {
        return true;
      }
    }
  }
  return false;
};

Playfield.prototype.collideRight = function(tetri) {
  var tetriMatrix = tetri.getMatrix();
  var i = tetriMatrix.length;
  var len = tetriMatrix[0].length;
  while (i--) {
    var j = len;
    while (j--) {
      if (tetriMatrix[i][j] > 0 &&
          this.matrix[tetri.posY + i][(tetri.posX + 1) + j] > 0) {
        return true;
      }
    }
  }
  return false;
};

Playfield.prototype.collideDown = function(tetri) {
  var tetriMatrix = tetri.getMatrix();
  var i = tetriMatrix.length;
  var j;
  while (i--) {
    j = tetriMatrix[0].length;
    while (j--) {
      if (tetriMatrix[i][j] > 0 &&
        this.matrix[(tetri.posY + 1) + i][tetri.posX + j] > 0 ) {
        return true;
      }
    }
  }
  return false;
};

Playfield.prototype.collide = function(tetri) {
  var tetriMatrix = tetri.getMatrix();
  var i = tetriMatrix.length;
  var len = tetriMatrix[0].length;
  var collisionPos = [];
  while (i--) {
    var j = len;
    while (j--) {
      if (tetriMatrix[i][j] > 0 &&
          this.matrix[tetri.posY + i] &&
          this.matrix[tetri.posY + i][tetri.posX + j] > 0) {
        return [(tetri.posY + i), (tetri.posX + j)];
      }
    }
  }
  return false;
};

Playfield.prototype.update = function(tetri) {
  var tetriMatrix = tetri.getMatrix();
  var i = tetriMatrix.length;
  var len = tetriMatrix[0].length;
  var rows = tetriMatrix.length;
  var cols;
  // update the matrix
  while (rows--) {
    cols = len;
    while (cols--) {
      if (tetriMatrix[rows][cols] == 1) {
        this.matrix[tetri.posY + rows][tetri.posX + cols] = tetri.type + 1;
      }
    }
  }
  return true;
};

Playfield.prototype.getMatrix = function() {
  return this.matrix;
};

Playfield.prototype.getColor = function() {
  return this.color;
};
/*
Playfield.prototype.clearComplete = function() {
  var i = this.matrix.length - 2;
  var j;
  var lines = [];
  for (i; i >= 1; i--) {
    if (this.matrix[i].indexOf(0) == -1) {
      lines.push(i);
      this.matrix[i] = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]; //0
      j = i;
      for (j; j >= 1; j--) { this.matrix[j] = this.matrix[j - 1]; }
      //this.matrix[0] = ; //0
    }
  }
};
*/

Playfield.prototype.clearComplete = function() {
  var i = this.matrix.length - 2;
  var count = 0;
  for (i; i >= 1; i--) {
    if (this.matrix[i].indexOf(0) == -1) {
      this.matrix.splice(i, 1);
      count++;
    }
  }
  while (count--) {
    this.matrix.unshift([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
  }
};

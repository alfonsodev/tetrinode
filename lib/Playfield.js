'use strict';

var events = require('events');
var util = require('util');

var Playfield = function() {
  this.matrix = [];
  this.width = 12;
  this.height = 23;
  this.color = 3;
  var i = this.height;
};

module.exports = Playfield;
Playfield.prototype = new events.EventEmitter();

Playfield.prototype.create = function (width, height, color, matrix) {
  var playfield = {
    width: 12,
    height: 23,
    color: 3
  }
  var i = playfield.height;
  var j;

  while (i--) {
    playfield.matrix[i] = [];
    j = playfield.width;
    while (j--) {
      if (i == (playfield.height - 1) ||  j === 0 || j == (playfield.width - 1) ) {
        playfield.matrix[i][j] = 9;
      } else {
        playfield.matrix[i][j] = 0;
      }
    }
  }

}

/*
 * direction 0, 1, 2, 3  === up, right, down, left
 */
Playfield.prototype.collision = function(tetri, direction) {
  var x;
  var m = tetri.getMatrix();
  var modes = [0, 1, 0, -1];
  var edges = tetri.getEdges(direction);
  x = edges[0];
  if (x >= 0 && this.matrix[tetri.posY][(tetri.posX + x + modes[direction])] > 0) {
    return true;
  }
  x = edges[1];
  if (x >= 0 && this.matrix[tetri.posY + 1][(tetri.posX + x + modes[direction])] > 0) {
    return true;
  }
  x = edges[2];
  if (x >= 0 && this.matrix[tetri.posY + 2][(tetri.posX + x + modes[direction])] > 0) {
    return true;
  }
  x = edges[3];
  if (x >= 0 && this.matrix[tetri.posY + 3][(tetri.posX + x + modes[direction])] > 0) {
    return true;
  }
  return false;
};

Playfield.prototype.collideRight = function(tetri) {
  var x;
  var m = tetri.getMatrix();
  var edges = tetri.getEdges(1);
  x = edges[0];
  if (x >= 0 && this.matrix[tetri.posY][(tetri.posX + x + 1)] > 0) {
    return true;
  }
  x = edges[1];
  if (x >= 0 && this.matrix[tetri.posY + 1][(tetri.posX + x + 1)] > 0) {
    return true;
  }
  x = edges[2];
  if (x >= 0 && this.matrix[tetri.posY + 2][(tetri.posX + x + 1)] > 0) {
    return true;
  }
  x = edges[3];
  if (x >= 0 && this.matrix[tetri.posY + 3][(tetri.posX + x + 1)] > 0) {
    return true;
  }
  return false;
};

/*
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
*/
Playfield.prototype.collideDown = function(tetri) {
  var tetriMatrix = tetri.getMatrix();
  var i = tetriMatrix.length;
  var j;
  while (i--) {
    j = tetriMatrix[0].length;
    while (j--) {
      if (tetriMatrix[i][j] > 0 &&
        this.matrix[(tetri.posY + 1) + i][tetri.posX + j] > 0 ) {
        this.clearComplete();
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


/*
 * old slow clearComplete
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
  if (count > 0) this.emit('clearedLines', count);
  while (count--) {
    this.matrix.unshift([9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9]);
  }
};

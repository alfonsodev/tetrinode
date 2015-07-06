'use strict';
var Playfield = {
  EMPTY_BLOCK: 0,
  WALL_BLOCK: 9
};

Playfield.create = function (givenWidth, givenHeight, givenColor, givenMatrix) {
  var playfield = {
    matrix: givenMatrix || [],
    width: givenWidth || 12,
    height: givenHeight || 23,
    color: givenColor || 3
  };

  var i = playfield.height;
  var j;

  while (i--) {
    playfield.matrix[i] = [];
    j = playfield.width;
    while (j--) {
      if (i == (playfield.height - 1) ||  j === 0 || j == (playfield.width - 1) ) {
        playfield.matrix[i][j] = this.WALL_BLOCK;
      } else {
        playfield.matrix[i][j] = this.EMPTY_BLOCK;
      }
    }
  }

  return playfield;
};

/*
 * direction 0, 1, 2, 3  === up, right, down, left
 */
Playfield.collision = function(tetri, direction, matrix) {
  var x;
  var m = tetri.getMatrix();
  var modes = [0, 1, 0, -1];
  var edges = tetri.getEdges(direction);
  x = edges[0];
  if (x >= 0 && matrix[tetri.posY][(tetri.posX + x + modes[direction])] > 0) {
    return true;
  }
  x = edges[1];
  if (x >= 0 && matrix[tetri.posY + 1][(tetri.posX + x + modes[direction])] > 0) {
    return true;
  }
  x = edges[2];
  if (x >= 0 && matrix[tetri.posY + 2][(tetri.posX + x + modes[direction])] > 0) {
    return true;
  }
  x = edges[3];
  if (x >= 0 && matrix[tetri.posY + 3][(tetri.posX + x + modes[direction])] > 0) {
    return true;
  }
  return false;
};

Playfield.collideRight = function(tetri, matrix) {
  var x;
  var m = tetri.getMatrix();
  var edges = tetri.getEdges(1);
  x = edges[0];
  if (x >= 0 && matrix[tetri.posY][(tetri.posX + x + 1)] > 0) {
    return true;
  }
  x = edges[1];
  if (x >= 0 && matrix[tetri.posY + 1][(tetri.posX + x + 1)] > 0) {
    return true;
  }
  x = edges[2];
  if (x >= 0 && matrix[tetri.posY + 2][(tetri.posX + x + 1)] > 0) {
    return true;
  }
  x = edges[3];
  if (x >= 0 && matrix[tetri.posY + 3][(tetri.posX + x + 1)] > 0) {
    return true;
  }

  return false;
};

Playfield.collideDown = function(tetri, matrix) {
  var tetriMatrix = tetri.getMatrix();
  var i = tetriMatrix.length;
  var j;

  while (i--) {
    j = tetriMatrix[0].length;
    while (j--) {
      if (tetriMatrix[i][j] > 0 &&
        matrix[(tetri.posY + 1) + i][tetri.posX + j] > 0 ) {
        return true;
      }
    }
  }

  return false;
};

Playfield.collide = function(tetri, matrix) {
  var tetriMatrix = tetri.getMatrix();
  var i = tetriMatrix.length;
  var len = tetriMatrix[0].length;
  var collisionPos = [];
  while (i--) {
    var j = len;
    while (j--) {
      if (tetriMatrix[i][j] > 0 &&
          matrix[tetri.posY + i] &&
          matrix[tetri.posY + i][tetri.posX + j] > 0) {
        return [(tetri.posY + i), (tetri.posX + j)];
      }
    }
  }

  return false;
};

Playfield.update = function(tetri, matrix) {
  var tetriMatrix = tetri.matrix;
  var len = tetriMatrix[0].length;
  var rows = tetriMatrix.length;
  var cols;

  while (rows--) {
    cols = len;
    while (cols--) {
      if (tetriMatrix[rows][cols] == 1) {
        matrix[tetri.posY + rows][tetri.posX + cols] = tetri.type + 1;
      }
    }
  }

  return matrix;
};
/**
 * Search for complete lines, lines without zeros
 * and replace the whole line with an empty line
 */
Playfield.clearComplete = function(matrix, eventObject) {
  var i = matrix.length - 2;
  var count = 0;

  for (i; i >= 1; i--) {
    if (matrix[i].indexOf(0) == -1) {
      matrix.splice(i, 1);
      count++;
    }
  }

  if (count > 0) {
    eventObject.emit('clearedLines', count);
  }

  //TODO: Don't like hardcoded 0 and 9's 
  while (count--) {
    matrix.unshift([this.WALL_BLOCK, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.WALL_BLOCK]);
  }

  return matrix;
};

module.exports = Playfield;

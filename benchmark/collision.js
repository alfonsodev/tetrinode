var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');
var Tetromino = require('lib').Tetromino;
var tetro;

var ref = [
  //  1  2  3  4  5  6  7  8  9 10  11
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 0
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 1
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 2
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 3
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 4
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 5
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 6
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 7
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 8
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 9
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 10
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 11
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 12
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 13
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 14
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 15
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 16
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 17
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 18
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 19
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 20
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 21
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] // 22
];

var collideLeftWhile = function(tetri) {
  this.matrix = ref;
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

collideLeft = function(tetri) {
  var x;
  var m = tetri.getMatrix();
  x = m[0].indexOf(1);
  if (x >= 0 && this.matrix[tetri.posY][(tetri.posX + x - 1)] > 0) {
    return true;
  }
  x = m[1].indexOf(1);
  if (x >= 0 && this.matrix[tetri.posY + 1][(tetri.posX + x - 1)] > 0) {
    return true;
  }
  x = m[2].indexOf(1);
  if (x >= 0 && this.matrix[tetri.posY + 2][(tetri.posX + x - 1)] > 0) {
    return true;
  }
  x = m[3].indexOf(1);
  if (x >= 0 && this.matrix[tetri.posY + 3][(tetri.posX + x - 1)] > 0) {
    return true;
  }
  return false;
};
collideLeft2 = function(tetri) {
  var x;
  var m = tetri.getMatrix();
  var edges = tetri.getEdges(3);
  x = edges[0]; 
  
  if (x >= 0 && this.matrix[tetri.posY][(tetri.posX + x - 1)] > 0) {
    return true;
  }
  x = edges[1];
  if (x >= 0 && this.matrix[tetri.posY + 1][(tetri.posX + x - 1)] > 0) {
    return true;
  }
  x = edges[2];
  if (x >= 0 && this.matrix[tetri.posY + 2][(tetri.posX + x - 1)] > 0) {
    return true;
  }
  x = edges[3];
  if (x >= 0 && this.matrix[tetri.posY + 3][(tetri.posX + x - 1)] > 0) {
    return true;
  }
  return false;
};
onSetup = function() {
  tetro = new Tetromino();
};

var collision = function(tetri, direction) {
  var x;
  var m = ref; 
  var modes = [0, 1, 0, -1];
  var edges = tetri.getEdges(direction);
  x = edges[0];
  if (x >= 0 && this.matrix[tetri.posY][(tetri.posX + x + -1)] > 0) {
    return true;
  }
  x = edges[1];
  if (x >= 0 && this.matrix[tetri.posY + 1][(tetri.posX + x + -1)] > 0) {
    return true;
  }
  x = edges[2];
  if (x >= 0 && this.matrix[tetri.posY + 2][(tetri.posX + x + -1)] > 0) {
    return true;
  }
  x = edges[3];
  if (x >= 0 && this.matrix[tetri.posY + 3][(tetri.posX + x + -1)] > 0) {
    return true;
  }
  return false;
};
Benchmark('CollisionDetection', { setup: onSetup });
var suite = new Benchmark.Suite;


suite
  .add('collideLeft-1', function() {
      collideLeftWhile(tetro);
    })
  .add('collideLef-2', function() {
      collideLeft(tetro);
    })
  .add('collide-2', function() {
      collideLeft2(tetro);
    })
  .add('collide-3', function() {
      collision(tetro, 3);
    })
  .on('cycle', function(event) {
      benchmarks.add(event.target);
    })
  .on('complete', function() {
      // console.log('Fastest is ' + this.filter('fastest').pluck('name'));
      benchmarks.log();
      process.exit(0);
    });

onSetup();
suite.run({'async' : true});

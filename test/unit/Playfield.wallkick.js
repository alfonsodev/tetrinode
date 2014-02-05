var assert = require('assert');
var Playfield = require('../../index').Playfield;
var Tetromino = require('../../index').Tetromino;

//Utility to print matrix
var printM = function(matrix) {
  console.log(' ');
  var buff;
  for (var i = 0; i < matrix.length; i++) {
    buff = '';
    for (var j = 0; j < matrix[0].length; j++) {
      buff = buff + matrix[i][j];
    }
    console.log(buff);
  }
};

// Tetromino I starts in orientation 3, close to wall
describe('Wall kick rotating I on left side ', function() {
  it('kicks the wall!', function(done) {
    var playfield1 = new Playfield();
    var tetro = new Tetromino();
    // rotation from orientation 3 to orientation 0
    //    Starting state        wall kicked
    // 0  100000000001        100000000001
    // 1  100000000001        100000000001
    // 2  100000000001        100000000001
    // 3  110000000001        100000000001
    // 4  110000000001        111110000001
    // 5  110000000001        100000000001
    // 6  110000000001        100000000001
    // 7  100000000001        100000000001
    // 8  100000000001        100000000001
    // 9  100000000001        100000000001
    // 10 100000000001        100000000001
    // 11 100000000001        100000000001
    // 12 100000000001        100000000001
    // 13 100000000001        100000000001
    // 14 100000000001        100000000001
    // 15 100000000001        100000000001
    // 16 100000000001        100000000001
    // 17 100000000001        100000000001
    // 18 100000000001        100000000001
    // 19 100000000001        100000000001
    // 20 111111111111        111111111111
    // place tetromino in the starting point situation
    tetro.orientation = 3;
    tetro.posX = 0;
    tetro.posY = 3;
    tetro.rotate();
    playfield1.update(tetro);
    //console.log(tetro);
    printM(playfield1.getMatrix());
    assert.equal(1, tetro.posX, "Wall kick doesn't work");
    done();
  });
});

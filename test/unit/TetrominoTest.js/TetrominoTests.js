var assert = require('assert');
var Playfield = require('../../../index').Playfield;
var Tetromino = require('../../../index').Tetromino;

var printM = function(matrix) {
  var buff;
  for (var i = 0; i < matrix.length; i++) {
    buff = '';
    for (var j = 0; j < matrix[0].length; j++) {
      buff = buff + matrix[i][j];
    }
    console.log(buff);
  }
};

describe('Tetromino', function() {
  it('tetromino rotate clockwise', function() {
    var tetro = new Tetromino();
    assert.equal(0, tetro.orientation);
    tetro.orientation = tetro.rotate(tetro.orientation);
    assert.equal(1, tetro.orientation);
    tetro.orientation = tetro.rotate(tetro.orientation);
    assert.equal(2, tetro.orientation);
    tetro.orientation = tetro.rotate(tetro.orientation);
    assert.equal(3, tetro.orientation);
    tetro.orientation = tetro.rotate(tetro.orientation);
    assert.equal(0, tetro.orientation);
  });

  it('tetromino rotate anticlockwise', function() {
    var tetro = new Tetromino();
    assert.equal(0, tetro.orientation);
    tetro.orientation = tetro.rotate(tetro.orientation, true);
    assert.equal(3, tetro.orientation);
    tetro.orientation = tetro.rotate(tetro.orientation, true);
    assert.equal(2, tetro.orientation);
    tetro.orientation = tetro.rotate(tetro.orientation, true);
    assert.equal(1, tetro.orientation);
    tetro.orientation = tetro.rotate(tetro.orientation, true);
    assert.equal(0, tetro.orientation);
  });

  it('constructor', function(done) {
    var tetro = new Tetromino();
    assert.strictEqual('object', typeof tetro);
    done();
  });

  it('constructor params', function() {
    var tetro = new Tetromino(1, 5, 6);
    assert.strictEqual(true, tetro instanceof Tetromino);
    assert.strictEqual(tetro.posX, 5);
    assert.strictEqual(tetro.posY, 6);
    assert.strictEqual(tetro.type, 1);
  });

  it('rotate clockwise', function() {
    var tetro = new Tetromino();
    assert.equal(0, tetro.orientation);
    tetro.rotate();
    assert.equal(1, tetro.orientation);
    tetro.rotate();
    assert.equal(2, tetro.orientation);
    tetro.rotate();
    assert.equal(3, tetro.orientation);
    tetro.rotate();
    assert.equal(0, tetro.orientation);
  });

  it('rotate anti clockwise', function() {
    var tetro = new Tetromino();
    assert.equal(0, tetro.orientation);
    tetro.rotate(true);
    assert.equal(3, tetro.orientation);
    tetro.rotate(true);
    assert.equal(2, tetro.orientation);
    tetro.rotate(true);
    assert.equal(1, tetro.orientation);
    tetro.rotate(true);
    assert.equal(0, tetro.orientation);
  });

  it('getMatrix', function() {
    var targetMatrix = [[0, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
    var tetro = new Tetromino(1);
    tetro.rotate();
    assert.deepEqual(targetMatrix, tetro.getMatrix());
  });

  it('resetTo', function() {

    var tetro = new Tetromino(1);
    tetro.resetTo(3);
    assert.equal(tetro.type, 3);
    assert.equal(tetro.posX, 4);
    assert.equal(tetro.posY, 0);
  });


  it('getLeftEdge', function() {
    var tetro = new Tetromino(0);
    tetro.getLeftEdge();
  });
});

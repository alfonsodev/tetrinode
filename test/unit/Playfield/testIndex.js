var assert = require('assert');
var Playfield = require('../../../index').Playfield;

describe('Playfield constructor', function() {
  it('can be instaciated', function() {
    var playfield1 = new Playfield();
    assert.strictEqual('object', typeof playfield1);
  });

  it('has the correct dimensions', function() {
    var playfield1 = new Playfield();
    assert.equal(playfield1.matrix.length, playfield1.height);
    assert.equal(playfield1.matrix[0].length, playfield1.width);
  });
});

describe('Playfield collisions', function() {
  it.skip('update matrix', function() {
    var matrixR = [];
    var playfield1 = new Playfield();
    var tetro = {
      posX: 1,
      posY: 18,
      color: 3,
      getMatrix: function() { return [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]; }
    };

    playfield1.update(tetro);
    assert.deepEqual(matrixR, playfield1.matrix, 'doen\'t print ok' );
  });


  it.only('collideLeft with wall', function() {
    var playfield1 = new Playfield();
    var tetro = {
      posX: 0,
      posY: 18,
      getMatrix: function(){ return [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]]; }
    };
    assert.equal(playfield1.collideLeft(tetro), true);
    tetro.posX = 1;
    assert.equal(playfield1.collideLeft(tetro), false);
    tetro.getMatrix = function() { return [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]]; };
    tetro.posX = 0;
    assert.equal(playfield1.collideLeft(tetro), true);
  });

it('collideRight with wall', function() {
    var playfield1 = new Playfield();
    var tetro = {
      posX: 8,
      posY: 13,
      getMatrix: function(){ return [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]]; }
    };
    assert.equal(playfield1.collideRight(tetro), true);
    tetro.posX = 7;
    assert.equal(playfield1.collideRight(tetro), false);

  });

});

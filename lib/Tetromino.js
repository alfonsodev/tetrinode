var Tetromino = function() {
    // SRS rotation system
    this.grid = [
        [
            [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // I 6 pos 3
            [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]], // I 6 pos 1
            [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]], // I 6 pos 2
            [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]  // I 6 pos 3
        ],
        [
            [[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // J 63
            [[0, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]], // J 63
            [[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]], // J 63
            [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]]  // J 63
        ],
        [
            [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // L 166
            [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], // L 166
            [[0, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0]], // L 166
            [[1, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]  // L 166
        ],
        [
            [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]], // O 4
            [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]], // O 4
            [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]], // O 4
            [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]  // O 4
        ],
        [
            [[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // S 2
            [[0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]], // S 2
            [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]], // S 2
            [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]] // S 2
        ],
        [
            [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // T 5
            [[0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], // T 5
            [[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], // T 5
            [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]  // T 5
        ],
        [
            [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // Z 9
            [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], // Z 9
            [[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], // Z 9
            [[0, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]]  // Z 9
        ]
    ];
};

Tetromino.prototype.create = function (pType, pPosX, pPosY) {
    var newTetromino = {
        posX : pPosX || 5,
        posY : pPosY || 0,
        colors : [6, 63, 166, 4, 5, 1, 9],
        type : pType  || 0,
        orientation : 0,
        lEdges : [],
        rEdges : []
    };
  
  // Generate left edges
  for (var i = 0; i < 7; i++) {
      newTetromino.lEdges[i] = [];
      newTetromino.rEdges[i] = [];
    for (var j = 0; j < 4; j++) {
        newTetromino.lEdges[i][j] = [];
        newTetromino.rEdges[i][j] = [];
      for (var e = 0; e < 4; e++) {
        newTetromino.lEdges[i][j].push(this.grid[i][j][e].indexOf(1));
        newTetromino.rEdges[i][j].push(this.grid[i][j][e].lastIndexOf(1));
      }
    }
  }

    newTetromino.edges = [
        null,
        newTetromino.rEdges,
        null,
        newTetromino.lEdges
    ];

 // console.log(this.edges);
 //
 // process.exit(0);
  return newTetromino;
};

Tetromino.prototype.rotate = function(orientation, antiClockWise) {
  var antiClockWise = antiClockWise || false;
  var result = orientation; 
  result = (antiClockWise)? (result - 1) : (result+1);
  if (result > 3) {
    return result = 0;
  }
  if (result < 0) {
    return result = 3;
  }
  return result;
};

module.exports = Tetromino;

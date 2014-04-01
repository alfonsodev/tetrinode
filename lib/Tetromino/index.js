var Tetromino = function(pType, pPosX, pPosY) {
  this.posX = pPosX || 5;
  this.posY = pPosY || 0;
  this.colors = [6, 63, 166, 4, 5, 1, 9];
  this.type = pType  || 0;
  this.orientation = 0;
  var lEdges = [];
  var rEdges = [];
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
  
  // Generate left edges
  for (var i = 0; i < 7; i++) {
    lEdges[i] = [];
    rEdges[i] = [];
    for (var j = 0; j < 4; j++) {
      lEdges[i][j] = [];
      rEdges[i][j] = [];
      for (var e = 0; e < 4; e++) {
        lEdges[i][j].push(this.grid[i][j][e].indexOf(1));
        rEdges[i][j].push(this.grid[i][j][e].lastIndexOf(1));
      }
    }
  }

  this.edges = [null, rEdges, null, lEdges];

 // console.log(this.edges);
  //process.exit(0);
};

module.exports = Tetromino;

Tetromino.prototype.rotate = function(antiClockWise) {
  var antiClockWise = antiClockWise || false;
  if (!antiClockWise) {
    this.orientation++;
    if (this.orientation > 3) {
      this.orientation = 0;
    }
  } else {
    this.orientation--;
    if (this.orientation < 0) {
      this.orientation = 3;
    }
  }
};

Tetromino.prototype.resetTo = function(type) {
  this.posY = 0;
  this.posX = 4;
  this.type = type;
};

Tetromino.prototype.getMatrix = function() {
  var type = this.type;
  var orientation = this.orientation;
  var matrix = this.grid[type][orientation];
  return matrix;
};

Tetromino.prototype.getEdges = function(direction) {
  return this.edges[direction][this.type][this.orientation];
};


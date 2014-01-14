//Todo this if can be drop using NODE_PATH 
var Interface = require('lib').Interface;
var Tetromino = require('lib').Tetromino;
var Loop = require('lib').Loop;

var scr = new Interface();
var loop = new Loop();

//Todo:Change this class with the origin Playground
var pg = {
  posX:0,
  posY:0,
  color: 'blue',
  getMatrix: function() {
    
    return [
      //   0 1 2 3 4 5 6 7 8 910 11
      [1,0,0,0,0,0,0,0,0,0,0,1], //0
      [1,0,0,0,0,0,0,0,0,0,0,1],// 1
      [1,0,0,0,0,0,0,0,0,0,0,1],// 2
      [1,0,0,0,0,0,0,0,0,0,0,1],// 3
      [1,0,0,0,0,0,0,0,0,0,0,1],// 4
      [1,0,0,0,0,0,0,0,0,0,0,1],// 5
      [1,0,0,0,0,0,0,0,0,0,0,1],// 6
      [1,0,0,0,0,0,0,0,0,0,0,1],// 7
      [1,0,0,0,0,0,0,0,0,0,0,1],// 8
      [1,0,0,0,0,0,0,0,0,0,0,1],// 9
      [1,0,0,0,0,0,0,0,0,0,0,1],// 10
      [1,0,0,0,0,0,0,0,0,0,0,1],// 11
      [1,0,0,0,0,0,0,0,0,0,0,1],// 12
      [1,0,0,0,0,0,0,0,0,0,0,1],// 13
      [1,0,0,0,0,0,0,0,0,0,0,1],// 14
      [1,0,0,0,0,0,0,0,0,0,0,1],// 15
      [1,0,0,0,0,0,0,0,0,0,0,1],// 16
      [1,0,0,0,0,0,0,0,0,0,0,1],// 17
      [1,0,0,0,0,0,0,0,0,0,0,1],// 18
      [1,0,0,0,0,0,0,0,0,0,0,1],// 19
      [1,0,0,0,0,0,0,0,0,0,0,1],// 20
      [1,0,0,0,0,0,0,0,0,0,0,1],// 21
      [1,1,1,1,1,1,1,1,1,1,1,1] // 22
    ];
  }
};

var tetro = new Tetromino(2, 0, 0);

scr.startListeningKeyEvents();
scr.render(tetro);
var logic = function() {
  
};
var gameStep = function() {
  scr.render(tetro, true);
};
// loop.createInterval(1000, gameStep);


// if(loop.keyup) clearTimeout(loop.keyup)
// if(keyUp) clearInterval(keyUp);
/*
    }
*/

/*
 * In tetris keydown is special because it acelerates the game.
 */
var keyup = null;
scr.on('down', function() {
  if(loop.speed!=70) {
      loop.createInterval(70, gameStep);
      keyUp = setTimeout(function(){
        loop.createInterval(1000, gameStep);
      }, 75);
  };
});

//This only happends on the Terminal 
process.on('SIGINT', function() {
  clearInterval(loop.interval);
  scr.close();
});


//Todo this if can be drop using NODE_PATH 
var Interface = require('lib').Interface;
var Tetromino = require('lib').Tetromino;
var Playfield = require('lib').Playfield;
var Loop = require('lib').Loop;
var Logic = require('lib').Logic;

var scr = new Interface();
var loop = new Loop();
var field = new Playfield();
var tetro = new Tetromino(2, 0, 0);
var logic = new Logic(scr, field, tetro, loop);


// if(loop.keyup) clearTimeout(loop.keyup)
// if(keyUp) clearInterval(keyUp);
/*
    }
*/

/*
 * In tetris keydown is special because it acelerates the game.
 */
//This only happends on the Terminal 
process.on('SIGINT', function() {
  clearInterval(loop.interval);
  scr.close();
});


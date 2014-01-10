var Timeloop = require('./timeloop.js');
// Lets say we have a "game" object that contains the function we want to run repetedly:
var game = {
  update: function(delta) {
    // Run the game logic here:
    //console.log(delta)
    console.log(JSON.stringify(game.loop.getBenchmark()));
  }
};
 
// We add a timeloop instance. The constructor will take a settings object:
game.loop = new Timeloop({
  targetFps: 60, // targetDelta should also be an alternative
  callback: game.update, // We should run game.update
  thisArg: game, // and the scope (this) should be the game object
});
 
// Start the gameloop
game.loop.start();
 
// Stop aka Pause the gameloop
//game.loop.stop();
 
// Check if the gameloop is running
// game.loop.isRunning(); // returns a boolean
 
// Target delta or fps can be changed later
//game.loop.setTargetDelta(10); // 100 fps
//game.loop.setTargetFps(60);  // 100 fps
 
// Those should have getters as well
//game.loop.getTargetDelta();
//game.loop.getTargetFps();
 
// We should also be able to get som benchmarking info
//game.loop.getAvgDelta(); // The average of the recent deltas
//game.loop.getAvgFps(); // The average of the recent fps
//game.loop.getAvgExecTime(); // The average of the recent execution times of the callback.
//game.loop.getBenchmarkHtml(); // Returns some html we could put in a div to see all benchmark info.


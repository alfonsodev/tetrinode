//Todo this if can be drop using NODE_PATH 
var Interface = require('lib').Interface;

var scr = new Interface();
scr.startListeningKeyEvents();
scr.rePaint();
scr.on('up', function() {
  console.log('yeaaa');
});


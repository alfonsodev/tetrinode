var App = require ('./app.js'),
    http = require('http'),
    app = new App();

app.set('port', process.env.NODE_PORT || 3000);

var server = http.createServer(app);
var io = require('socket.io').listen(server);
var debug = require('debug')('live-todo');

io.configure('development', function() {
  io.set('transports', ['websocket']);
  // io.set("origins","*");
  io.set('authorization', function (handshakeData, callback) {
//    debugger;
    callback(null, true); // error first callback style 
  });
});

io.sockets.on('connection', function (socket) {
  setInterval(function(){
    socket.emit('gameStep', 'kakakakka');
  }, 100);
  socket.join('todo');
  debug(io.sockets.clients().length + ' conected ...');
	socket.on('clientChange', function(data) {
		socket.broadcast.to('todo').emit('serverChange', data);	
	});
});
server.listen(app.get('port')); // not 'app.listen'!

console.log('server listening on port ' + app.get('port') + ' ...');



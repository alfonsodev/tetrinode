"strict mode";
var express = require('express');
var debug = require('debug')('livedo');

// var User = require('./lib/User');
debug('live todo applicatino');
module.exports = function() {
  var app = express();
  app.use(express.bodyParser());

  app.use(function(req,res,next){
    debug(req.method+ ':' + req.path);
    next();
  });

  app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use(function(err, req, res, next) {
    debug(err);
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    res.status(err.status || 500);
    res.render('500', { error: err });
  });

  app.post('/user/add/device', function(req, res) {
    if(!req.body.uuid || !req.body.uid || !req.body.token) {
      res.send(400);
    } else {
      res.send(200);
    }
  });

  app.get('/', function(req, res) {
    res.send(404);
  });

  return app; 
};


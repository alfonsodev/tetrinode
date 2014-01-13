(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = Browser = function() {
  console.log('Browser constructor');
};
Browser.prototype.hello = function(){
  console.log('I\'m browser');
};

},{}],2:[function(require,module,exports){
module.exports = Terminal = function() {
  console.log('Terminal constructor');
};
Terminal.prototype.hello = function(){
  console.log('I\'m the Termianl!! ');
};

},{}],3:[function(require,module,exports){
module.exports.Browser = require('./Browser');
module.exports.Terminal = require('./Terminal');

},{"./Browser":1,"./Terminal":2}],4:[function(require,module,exports){
module.exports.Interface = require('./Interface');

},{"./Interface":3}]},{},[4])
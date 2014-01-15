require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// mock node.js process.on 
process = {
  on: function(){}
};
var events = require('events');
module.exports = Canvas = function() {
  this.blockKeys = false;
  this.bgCanvas = document.getElementById('background');
  this.fgCanvas = document.getElementById('foreground');
  this.bgctx = this.bgCanvas.getContext('2d');
  this.fgctx = this.fgCanvas.getContext('2d');
  //Initial colors
  this.fgctx.fillStyle="#000066";
  this.bgctx.fillStyle="#006600";

  //Input
  this.keyMap = {
    '38': 'up',
    '40': 'down',
    '37': 'left',
    '39': 'right'
  };
  this.lastKey = null;
};

Canvas.prototype = new events.EventEmitter();

Canvas.prototype.hello = function(){
  console.log('I\'m browser');
};

Canvas.prototype.startListeningKeyEvents = function() {
  console.log('starting listnening')
  var self = this;
  document.addEventListener("keydown", function(e) {
    if(!self.blockKeys) {
      if(self.keyMap[e.keyCode]) {
        self.emit('keydown', self.keyMap[e.keyCode]);
      }
    }
  }, false);


  document.addEventListener("keyup", function(e) {
    self.emit('keyup');
  }, false);
};

Canvas.prototype.render = function(bg, fg) {
  var self = this;
  if(bg)
    this.printBgObject(bg);
  if(fg)
    this.printFgObject(fg);
 // requestAnimationFrame(self.render);
};

Canvas.prototype.printBgObject = function(pObject) {
    this.bgCanvas.width = this.bgCanvas.width; // Trick to clean canvas faster #performance
    var posX = pObject.posX || 0;
    var posY =  pObject.posY || 0;
    var matrix = pObject.getMatrix() || [0];
    var x=0, y=0;
    y = matrix.length;
    while(y--) {
      x = matrix[0].length;
      while(x--) {
        if (matrix[y][x]!=0) {
          this.bgctx.fillRect((posX+x)*10, (posY+y)*10, 10, 10); // Paint the box
        }
      }
    }
};

Canvas.prototype.printFgObject = function(pObject) {
  this.fgCanvas.width = this.fgCanvas.width; // Trick to clean canvas faster #performance
  var posX = pObject.posX || 0;
  var posY =  pObject.posY || 0;
  var matrix = pObject.getMatrix() || [0];
  var x=0, y=0;
  y = matrix.length;
  while(y--) {
    x = matrix[0].length;
    while(x--) {
      if (matrix[y][x]!=0) {
        this.fgctx.fillRect((posX+x)*10, (posY+y)*10, 10, 10); // Paint the box
      }
    }
  }
};


},{"events":10}],2:[function(require,module,exports){
  module.exports = require('./Ncurses');
if(typeof window == 'object') {
  module.exports = require('./Canvas');
}

},{"./Canvas":1,"./Ncurses":9}],3:[function(require,module,exports){
var Logic = function(scr, field, tetro, loop) {
  this.scr = scr;
  this.field = field;
  this.tetro = tetro;
  this.loop = loop;
  this.fast = 70;
  this.slow = 1000;
  this.action = null;
  // Todo: make this debug info optional
  // this.scr.write(2, 60, 'move L'+t[0] + ':'+ (t[1]*0.000001));

  this.scr.startListeningKeyEvents();
  this.scr.render(this.field, this.tetro);
  this.loop.createInterval(1000, this.gameStep.bind(this));

  //Accelerate the game on Keydown
  this.scr.on('keydown', (function(key) {
    //block more keys until next step is done
//    this.scr.blockKeys = true;
    this.action = key;
    if(this.loop.speed != this.fast) {
      this.loop.createInterval(this.fast, this.gameStep.bind(this));
    }      
  }).bind(this));
  //Slow it down again on keyup
};

Logic.prototype.gameStep = function(){
  // Call the function with pressed key name
  if(this.action) {
    console.log(this.action);
    this[this.action]();
    this.action = null;
  } else {
    this.down();
    if(this.loop.speed == this.fast)
    this.loop.createInterval(this.slow, this.gameStep.bind(this));
  }
  this.field.clearComplete();
  this.scr.render(this.field, this.tetro);
 // this.scr.blockKeys = false;
};

Logic.prototype.down = function() {
  var randomnumber;
  if(this.field.collideDown(this.tetro)) {
    this.field.update(this.tetro);
    this.tetro.posY = 0;
    this.tetro.posX = 4;
    randomnumber = Math.floor(Math.random()*7),
    this.tetro.type = randomnumber;
  } else {
    this.tetro.posY++;
  }
};

Logic.prototype.up = function() {
  console.log('up');
  this.tetro.rotate(false);
};


Logic.prototype.right = function() {
  if(this.field.collideRight(this.tetro) === false) {
    this.tetro.posX++;
  }
};

Logic.prototype.left = function() {
 console.log('left');
   if(this.field.collideLeft(this.tetro) === false) {
      this.tetro.posX = this.tetro.posX - 1;
    }
};

module.exports = Logic;

},{}],4:[function(require,module,exports){
/*
 * Loop
 * Game loop class
 */
var Loop =  function() {
  this.speed = 0;
  this.interval = null;
  this.keyup = null;
};

/*
 * createInterval
 * @spped is the timeInterval in miliseconds
 * @logic execute a game step 
 * @render render the game
 *
 */
Loop.prototype.createInterval = function(speed, callback) {
  if(this.interval) clearInterval(this.interval);
  this.speed = speed;
  this.interval = setInterval((function() {
    callback();
  }).bind(this), this.speed);
};

module.exports = Loop;

},{}],5:[function(require,module,exports){
var events = require('events'),
    util = require('util');

var Playfield = function() {
    this.matrix = [];
    this.colorMap = [];
    this.width = 12;
    this.height = 23;
    this.color = 3;
    this.colorMap = [];
    var i = this.height;
    while(i--){
        this.matrix[i] = [];
        this.colorMap[i] = [];
        var j = this.width;
        while(j--) {
            if(i==(this.height-1) || j===0 || j==(this.width-1)) {
                this.matrix[i][j] = 1;
            } else {
                this.matrix[i][j] = 0;
            }
            this.colorMap[i][j] = this.color;
        }
    }
};

Playfield.prototype = new events.EventEmitter();

Playfield.prototype.collideLeft = function(tetri) {
    var tetriMatrix = tetri.getMatrix();
    var i = tetriMatrix.length;
    var len = tetriMatrix[0].length;
    while(i--) {
        var j = len;
        while(j--) {
            if(tetriMatrix[i][j] === 1 &&
                this.matrix[tetri.posY + i][(tetri.posX-1) + j] === 1) {
                return true;
            }
        }
    }
    return false;
};
Playfield.prototype.collideRight = function(tetri) {
    var tetriMatrix = tetri.getMatrix();
    var i = tetriMatrix.length;
    var len = tetriMatrix[0].length;
    while(i--) {
        var j = len;
        while(j--) {
            if(tetriMatrix[i][j] === 1 &&
                this.matrix[tetri.posY + i][(tetri.posX+1) + j] === 1) {
                return true;
            }
        }
    }
    return false;
};

Playfield.prototype.collideDown = function(tetri) {
    var tetriMatrix = tetri.getMatrix();
    var i = tetriMatrix.length;
    var len = tetriMatrix[0].length;
    while(i--) {
        var j = len;
        while(j--) {
            if(tetriMatrix[i][j] === 1 &&
                this.matrix[(tetri.posY+1) + i][tetri.posX + j] === 1) {
                return true;
            }
        }
    }
    return false;
};

Playfield.prototype.collide = function(tetri) {
    var tetriMatrix = tetri.getMatrix();
    var i = tetriMatrix.length;
    var len = tetriMatrix[0].length;
    var collisionPos = [];
    while(i--) {
        var j = len;
        while(j--) {
            if(tetriMatrix[i][j] === 1 &&
                this.matrix[tetri.posY + i] &&
                this.matrix[tetri.posY + i][tetri.posX + j] === 1) {
                return [ (tetri.posY + i),
                         (tetri.posX + j)];
            }
        }
    }
    return false;
};

Playfield.prototype.update = function(tetri) {
    var tetriMatrix = tetri.getMatrix(),
        i = tetriMatrix.length,
        len = tetriMatrix[0].length;

    var rows = tetriMatrix.length;
    // update the matrix
    while(rows--) {
        var cols = len;
        while(cols--) {
            if(tetriMatrix[rows][cols]==1) {
                this.matrix[tetri.posY + rows][tetri.posX + cols] = 1;
                this.colorMap[tetri.posY + rows][tetri.posX + cols] = tetri.getColor();
            }
        }
    }
    return true;
};

Playfield.prototype.getMatrix = function() {
    return this.matrix;
};

Playfield.prototype.getColor = function() {
    return this.color;
};

Playfield.prototype.clearComplete = function() {
    var i = this.matrix.length-2;
    for(i; i>=1; i--){
      if(this.matrix[i].indexOf(0) == -1) {
        var j = i;
        for(j; j>=1; j--) {
            this.matrix[j]=this.matrix[j-1];
        }
        this.matrix[0] = [1,0,0,0,0,0,0,0,0,0,0,1]; //0
        return true;
      }
    }
    return false;
};
module.exports = Playfield;
},{"events":10,"util":14}],6:[function(require,module,exports){
var events = require('events'),
    util = require('util');

var Tetromino = function(pType, pPosX, pPosY) {
    this.posX = pPosX || 5;
    this.posY = pPosY || 0;
    this.colors = [6, 63, 166, 4, 5, 1, 9];
    this.type = pType || 0;
    this.orientation = 0;
    this.color = 6;
    // SRS rotation system
    this.grid = [
        [
            [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], // I 6 pos 3
            [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]], // I 6 pos 1
            [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]], // I 6 pos 2
            [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]  // I 6 pos 3
        ],
        [
            [[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]], // J 63
            [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]], // J 63
            [[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]], // J 63
            [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]  // J 63
        ],
        [
            [[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]], // L 166
            [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]], // L 166
            [[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]], // L 166
            [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]]  // L 166
        ],
        [
            [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]], // O 4
            [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]], // O 4
            [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]], // O 4
            [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]  // O 4
        ],
        [
            [[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]], // S 2
            [[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]], // S 2
            [[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]], // S 2
            [[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]] // S 2
        ],
        [
            [[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]], // T 5
            [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]], // T 5
            [[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]], // T 5
            [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]  // T 5
        ],
        [
            [[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]], // Z 9
            [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]], // Z 9
            [[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]], // Z 9
            [[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]]  // Z 9
        ]
    ];
};

Tetromino.prototype = new events.EventEmitter();
Tetromino.prototype.getMatrix = function() {
    return this.grid[this.type][this.orientation];
};

Tetromino.prototype.rotate = function(pClockWise) {
    if (typeof pClockWise === "undefined") { pClockWise = true; }
    if(pClockWise === true || pClockWise === 'undefined') {
        this.orientation++;
        if(this.orientation > 3) {
            this.orientation = 0;
        }
    } else if(pClockWise === false ) {
        this.orientation--;
        if(this.orientation < 0){
            this.orientation = 3;
        }
    }
    this.emit('rotating');
};

Tetromino.prototype.getColor = function() {
    return this.colors[this.type];
};

module.exports = Tetromino;

},{"events":10,"util":14}],"uM18kj":[function(require,module,exports){
module.exports.Interface = require('./Interface');
module.exports.Playfield = require('./Playfield');
module.exports.Tetromino = require('./Tetromino');
module.exports.Loop = require('./Loop');
module.exports.Logic = require('./Logic');


},{"./Interface":2,"./Logic":3,"./Loop":4,"./Playfield":5,"./Tetromino":6}],"lib":[function(require,module,exports){
module.exports=require('uM18kj');
},{}],9:[function(require,module,exports){

},{}],10:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        throw TypeError('Uncaught, unspecified "error" event.');
      }
      return false;
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      console.trace();
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],11:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],12:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],13:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],14:[function(require,module,exports){
var process=require("__browserify_process"),global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

},{"./support/isBuffer":13,"__browserify_process":12,"inherits":11}]},{},[])
/*
  By:      Olof Larsson http://oloflarsson.se
  For:     JSTeam.org
  Article: http://jsteam.org/timeloop-js-running-a-function-repeatedly-the-gameloop/
  License: MIT
*/
var Timeloop = function(settings) {
    this.targetFps = settings.targetFps || 60;
//  this.callback = settings.callback;
    this.thisArg = settings.thisArg;
		// Set up the default settings
		this.targetDelta = 10;
	//	this.thisArg = this;
		this.callback = settings.callback;
		// Extract custom settings
		//$.extend(this, settings);
		if (typeof this.targetFps !== 'undefined') {
			this.setTargetFps(this.targetFps);
			delete this.targetFps;
		}
debugger;
		// Benchmarking data. Set a 0 entry to avoid NaN when calculating mean.
		this.deltaHistory = [0];
		this.execTimeHistory = [0];
};

Timeloop.prototype.start = function() {
  if (! this.isRunning()) {
    this.lastCallTimeStamp = Date.now();
    this.scheduleOuterCallback();
  }
};

Timeloop.prototype.stop = function() {
  if (this.isRunning()) {
    clearTimeout(this.timeoutId);
    delete this.timeoutId;
  }
};

Timeloop.prototype.isRunning = function() {
  return typeof this.timeoutId !== 'undefined';
};

Timeloop.prototype.setTargetDelta = function(targetDelta) {
  this.targetDelta = targetDelta;
};

Timeloop.prototype.setTargetFps = function(targetFps) {
  this.targetDelta = this.math.fpsToDelta(targetFps);
};

Timeloop.prototype.getTargetDelta = function() {
  return this.targetDelta;
};

Timeloop.prototype.getTargetFps = function() {
  return this.math.deltaToFps(this.targetDelta);
};

Timeloop.prototype.scheduleOuterCallback = function() {
  var _me = this;
  this.timeoutId = setTimeout(function() {
    _me.outerCallback();
  }, this.targetDelta);
};

Timeloop.prototype.outerCallback = function() {
  // Schedule the next call
  this.scheduleOuterCallback();

  // Calculate delta and update this.lastCallTimeStamp
  var now = Date.now();
  var delta = now - this.lastCallTimeStamp;
  this.lastCallTimeStamp = now;

  // Call the callback with the correct thisArg and the delta as the only parameter
  this.callback.call(this.thisArg, delta);

  // Update benchmark history
  this.deltaHistory.push(delta);
  if (this.deltaHistory.length > 10) {
    this.deltaHistory.shift();
  }
  this.execTimeHistory.push(Date.now() - now);
  if (this.execTimeHistory.length > 10) {
    this.execTimeHistory.shift();
  }
};

Timeloop.prototype.math = {
  deltaToFps: function(delta) {
    return 1000.0 / delta;
  },

  fpsToDelta: function(fps) {
    return 1000.0 / fps;
  },

  average: function(a) {
    var r = { mean: 0, variance: 0, deviation: 0}, t = a.length;
    for (var m, s = 0, l = t; l--; s += a[l]);
    for (m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
    return r.deviation = Math.sqrt(r.variance = s / t), r;
  }
};

Timeloop.prototype.getAvgDelta = function() {
  return this.math.average(this.deltaHistory).mean;
};

Timeloop.prototype.getAvgFps = function() {
  return this.math.deltaToFps(this.getAvgDelta());
};

Timeloop.prototype.getAvgExecTime = function() {
  return this.math.average(this.execTimeHistory).mean;
};

Timeloop.prototype.getBenchmarkHtml = function() {
  return '\
    <span style="font-family: monospace;">\
    <b>Delta Average:&nbsp;&nbsp;&nbsp;&nbsp;</b>' + Math.round(this.getAvgDelta()) + '<br/>\
    <b>Delta Target:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>' + this.getTargetDelta() + '<br/>\
    <b>FPS Average:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>' + Math.round(this.getAvgFps()) + '<br/>\
    <b>FPS Target:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>' + this.getTargetFps() + '<br/>\
    <b>ExecTime Average:&nbsp;</b>' + Math.round(this.getAvgExecTime()) + '</span>';
};

Timeloop.prototype.getBenchmark = function() {
  return {
    fps: Math.round(this.getAvgDelta()),
    delta: this.getTargetDelta(),
    average: Math.round(this.getAvgFps()),
    target: this.getTargetFps(),
    average: Math.round(this.getAvgExecTime())
  };
}
module.exports = Timeloop;

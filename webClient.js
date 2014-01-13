var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
//ctx.font="30px Arial";
//ctx.fillText("Hello World",10,50);
var boxSize = 10;
var t = {
  i:0,
  j:0,
  c: '#00FF00'
};
// Properties _____________________________________________

var xMin = 0;
var xMax = c.height - c.height;
var pos = 0;
var dir = 1;
var speed = 1;
var fps = 60;
var interval = 1000 / fps;
//________________________________________________________

var  matrixR = [
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

var paintStage = function(m){
  requestAnimationFrame(paintStage);
  ctx.fillStyle="#0F0066";
  var i = m.length;
  for(;i--;) {
    var j = m[i].length;
    for(;j--;) {
      if(m[i][j]===1)
        ctx.fillRect(j*boxSize, i*boxSize, boxSize, boxSize);
    }
  }
};

var paintTetromino = function() {
  requestAnimationFrame(draw);
  c.width = 120;
  ctx.fillRect((t.j+1) *boxSize, t.i*boxSize, boxSize, boxSize);
}

var gameStep = function() {
  if(t.i< 120) {
    t.i = t.i + speed;
  } else {
    t.i=0;
  }
  console.log(t.j)
};

var fps=20;
/*
//initially paint the stage
paintStage(matrixR);
//change the color (expensive)
ctx.fillStyle = t.c;
setInterval(function(){
  gameStep();
  paintTetromino();
},1000/fps);
*/



// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// Animation Logic ________________________________________

console.log(interval)
ctx.fillStyle = t.c;
 function draw() {
//      console.log('draw')
  //      window.requestAnimationFrame(draw);
     paintTetromino();
  }

setInterval(function() {
  gameStep();     
  draw();
}, interval);

//draw();


var c = document.getElementById("foreground");
var bc = document.getElementById("background");
var ctx = c.getContext("2d");
var bctx = bc.getContext("2d");
var key = new THREEx.KeyboardState();
 
ctx.fillStyle="#000066";
bctx.fillStyle="#fF0066";
var box = {
  x: 0,
  y: 0,
  size: 10
};
var  m = [
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

var logic = function() {
  console.log(loop.speed)
  // game logic
  if(box.y<c.height) box.y+=10; //move the thing each second.
  else box.y = 0;
};

var view = function() {
  // game view/
  c.width=c.width;//clear the canvas 
  ctx.fillRect(box.x, box.y, box.size, box.size); //paint the box
  ctx.fillRect(box.x +11, box.y, box.size, box.size); //paint the box
  ctx.fillRect(box.x +22, box.y, box.size, box.size); //paint the box
  ctx.fillRect(box.x +33, box.y, box.size, box.size); //paint the box
  ctx.fillRect(box.x +44, box.y, box.size, box.size); //paint the box
  //window.requestAnimationFrame(view);
  var i = m.length;
  for(;i--;) {
    var j = m[i].length;
    for(;j--;) {
      if(m[i][j]===1)
        bctx.fillRect(j*box.size, i*box.size, box.size, box.size);
    }
  }
/*
  if(key.pressed('down')){
    console.log('dow!')
    loop.switchTo(20);
    // switch to fastInterval
    // switchTo(0); //
  } else {
    if(loop.spped==20){
      loop.switchTo(1000);
    }
    // if slow is running do nothing
    // if fast was running swithto slow
  }
  */
}
document.addEventListener("keydown", function(e) {
  if (e.keyCode == 40 && loop.speed!=70) {
      loop.createInterval(70);
  }
}, false);
document.addEventListener("keyup", function(e) {
  if (loop.speed!=1000) {
      loop.createInterval(1000);
  }

}, false);



var loop =  {
  speed: 0,
  interval : null,
  createInterval: function(time) {
    if(this.interval) clearInterval(this.interval);
    console.log('create interval '+time)           
    this.speed = time;
    this.interval = setInterval(function(){
    logic();
    window.requestAnimationFrame(view); //kick off the animation
    },time);
  }
};
loop.createInterval(1000);

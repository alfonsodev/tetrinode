
if(false){
  var nc = require('ncurses');
  var w = new nc.Window();
  nc.colorPair(1, 3, 2);
  w.attrset(nc.colorPair(1));
  nc.showCursor=false;
var inte=  setInterval(function(){
  w.clear(); 
  w.addstr(0,0,'hi')
  w.refresh();
  },100);
  process.on('SIGINT', function(){
    clearInterval(inte);
    w.addstr(0,0,'' + nc.maxColorPairs);
    w.close();
  });

 
}else{

if (typeof(window)=='undefined') {
  var nc = require('ncurses');
  var win = new nc.Window()
  var window = {};
  nc.showCursor = false;
//  w = new nc.Window();
  nc.colorPair(1, 2, 3);
  win.attrset(nc.colorPair(1));
  window.requestAnimationFrame = function(callback) {
    callback();
    win.refresh();
  }
  var Ctx = function() {
    this.height=22;
    this.w = win;
    this.fillStyle = null;
    this.fillRect = function(x, y, w, h){
      this.w.addstr(y,x,'x');
    };
    this.clearCanvas=function(){
      this.w.clear();
    }
 }
  var c = new Ctx();
  var ctx = new Ctx();
/*  var ctx = {
    win: w,
    fillStyle: null,
    fillRect: function(x, y, w, h){
      this.win.addstr(y,x,'x');
    }
  }
  var c = {
    win: w,
    clearCanvas: function(){
      this.win.clear();
    }
  };
*/
  var keyUp=null;  
  win.on('inputChar', function(charKey, charNum, isKey) {
    if (isKey && charNum == 258 && loop.speed!=70) {
//      if(loop.keyup) clearTimeout(loop.keyup)
      loop.createInterval(70);
      keyUp = setTimeout(function(){ loop.createInterval(1000); }, 75);
     // if(keyUp) clearInterval(keyUp);
    }
    
    // w2.addstr(5, 5, 'HELLO: ' + charNum )
  });
  
  var window = {
    requestAnimationFrame: function(callback){
      process.nextTick(callback);
    }
  };

  process.on('SIGINT', function(){
    clearInterval(loop.interval);
    ctx.w.addstr(0,0,'' + nc.maxColorPairs);
    ctx.w.close();
  });


}else{
  var c = document.getElementById("foreground");
  c.clearCanvas = function(){
    this.width = this.width;
  }
  var bc = document.getElementById("background");
  var ctx = c.getContext("2d");
  var bctx = bc.getContext("2d");
  var key = new THREEx.KeyboardState();
  ctx.fillStyle="#000066";
  bctx.fillStyle="#fF0066";

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


}
 



var box = {
  x: 1,
  y: 0,
  size: 1
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
//  console.log(loop.speed)
  // game logic
  if(box.y<c.height) ++box.y; //move the thing each second.
  else box.y = 0;
  //box.y++;
};

var view = function() {
  // game view/
  c.clearCanvas();//clear the canvas 
    //window.requestAnimationFrame(view);
  var i = m.length;
  for(;i--;) {
    var j = m[i].length;
    for(;j--;) {
      if(m[i][j]===1)
        ctx.fillRect(j*box.size, i*box.size, box.size, box.size);
    }
  }
  ctx.fillRect(box.x, box.y, box.size, box.size); //paint the box
  ctx.fillRect(box.x+1 , box.y, box.size, box.size); //paint the box
  ctx.fillRect(box.x+2 , box.y, box.size, box.size); //paint the box
  ctx.fillRect(box.x+3, box.y, box.size, box.size); //paint the box
  ctx.fillRect(box.x+4, box.y, box.size, box.size); //paint the box

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

  win.addstr(5,5,box.x+'-'+box.y);
  win.refresh();
}



var loop =  {
  speed: 0,
  interval : null,
  keyup: null,
  createInterval: function(time) {
    if(this.interval) clearInterval(this.interval);
    this.speed = time;
    this.interval = setInterval(function(){
      //auto back to slow
      //if( this.speed == 70 ) this.keyup = setTimeout(function(){ this.createInterval(100);},10);

      logic();
      view();
//    window.requestAnimationFrame(view); //kick off the animation
//console.log('oye')
    },time);
  }
};
 loop.createInterval(1000);

}

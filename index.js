#!/usr/bin/env node
// var Screen = (typeof module == 'undefined')
//  ? require('./lib/interface/canvas');
//  : require('./lib/Interface/Ncurses');
if(typeof window == 'object') {
  var Interface = require('tetrinode').Interface;
} else {
  var Interface = require('./lib/Interface');
}
var scr = new Interface();
console.log('here');


/*
var scr = new Screen();
var box = {
  x: 1,
  y: 0,
  size: 1
};
var  m = [
//   0 1 2 3 4 5 6 7 8 910 11
    [1,0,0,0,0,0,0,0,0,0,0,1],// 0
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

var loop =  {
  speed: 0,
  interval : null,
  keyup: null,
  createInterval: function(time) {
    if(this.interval) clearInterval(this.interval);
    this.speed = time;
    this.interval = setInterval(function(){
      logic();
      scr.view();
    // window.requestAnimationFrame(view); //kick off the animation
    // console.log('oye')
    },time);
  }
};

scr.startListeningKeyEvents();
loop.createInterval(1000);
*/

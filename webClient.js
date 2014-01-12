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
  ctx.fillStyle="#0F0066";
  var i = m.length;
  for(;i--;) {
    var j = m[i].length;
    for(;j--;) {
      if(m[i][j]===1)
        ctx.fillRect(j*boxSize, i*boxSize, boxSize, boxSize);
    }
  }
  requestAnimationFrame(paint);
};

var paintTetromino = function(j,i) {
  ctx.fillStyle = t.c;
  ctx.fillRect((j+1) *boxSize, i*boxSize, boxSize, boxSize);
  requestAnimationFrame(paint);
};
var paint = function (m){
  c.width = 120;
//  ctx.clearRect (10 ,10 ,100 , 10);
  paintStage(m);
  paintTetromino(t.i,t.j);
  requestAnimationFrame(paint);
}

var gameStep = function() {
  if(t.j < 20) {
    ++t.j;
  } else {
    t.j=0;
  }
};
var fps=60;
setInterval(function(){
  gameStep();
  paint(matrixR);
},1000/fps);









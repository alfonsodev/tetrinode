var nc = require('ncurses');
var w = new nc.Window();
var w2 = new nc.Window(20, 20);
for (var i=1e6, lookupTable=[]; i--;) {
  lookupTable.push(Math.random()*41|0);
}
function lookup() {
  return ++i >= lookupTable.length ? lookupTable[i=0] : lookupTable[i];
}
var numColors = nc.numColors;
//1 rojo
while(numColors--){
	nc.colorPair(numColors, numColors, 0);
}
nc.showCursor=false;
  var c = 0;
  var c2=0;
  w2.on('inputChar', function(charKey,charNum,isKey) {
    ++c2;
    w2.addstr(5, 5, 'HELLO: '+c2+' : ' + charNum )
  });

setTimeout(function(){
  var loop = setInterval(function(){
    var x = 20;
    w.clear();
    while(x--){
      w.attrset(nc.colorPair(c));
      w.addstr(lookup(),lookup(),'laia');
      if(c<252)c++; else c=0;
    }
    w.refresh();
  }, 16);
}, 2000);

process.on('SIGINT', function(){
	clearInterval(loop);
	w.addstr(0,0,'' + nc.maxColorPairs);
	w.close();
});


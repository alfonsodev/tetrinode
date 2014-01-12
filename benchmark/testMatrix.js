var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');
var dict = {};
var matrix = [];
var sparseMatrix=[];
var text='';
var b = function (matrix){
	var i = Object.keys(matrix).length;
	var cont = 0;
  var a;
	while(i--){
		a = Object.keys(matrix)[i].split('-');
		if(matrix[Object.keys[i]]==1)	
			cont++;
	}
};

var c = function(m){
	var cont = 0;
	var keys = Object.keys(m);
	var i = keys.length;
	while(i--){
		var a = keys[i].split('-');
		if(m[keys[i]]==1)	
			cont++;
	}
	return cont;
};
var d = function(dict){
  var cont = 0;
  var a;
  for (var k in dict){
    if (typeof dict[k] !== 'function') {
      a = k.split('-');
      cont++;
    }
  }
  return cont;
}
var a = function(matrix) {
	var cont = 0;
  var i,j,a;

	for (i=0; i < matrix.length; i++) {
		for (j=0; j < matrix[i].length; j++) {
			if(matrix[i][j]==1) {
        a = [i,j];
				cont++;
			}
		}
	}
  debugger;
	return cont;
};
var a2 = function(matrix) {
	var cont = 0;
  var i,j,a,l,le;

	for (i=0, l = matrix.length;i<l; i++) {
		for (j=0, le = matrix[i].length;j<le; j++) {
			if(matrix[i][j]==1) {
        a = [i,j];
				cont++;
			}
		}
  };
	return cont;
}
var a21 = function(matrix) {
	var cont = 0;
  var i,j,a;
  i=22;
  j=10;
  while(i--){
    debugger;
    j=10;
    while(j--){
      debugger;
			if(matrix[i] && matrix[i][j]==1) {
        debugger;
        a = [i,j];
				cont++;
			}
		}
  }
	return cont;
}
var a3 = function(str){
  var data = str.split(';');
  var i = data.length;
  var cords = [];
  var cont=0;
  while (i--) {
    cords.push(data[i][0]);
    cords.push(data[i][2]);
    cords.push(data[i][4]);
    cont++;
  };
  debugger;
  return cont;
}
var startup = function(matrix, text, callback) {
  var i,j;
  for (i=0; i < 22; i++) {
    matrix[i] = [];
    for (j=0; j < 10; j++) {
      if(j%2==0){
        matrix[i][j]=0;
      }else{
        matrix[i][j]=1;
        dict[i+'-'+j]=1
        text = text + i+'-'+j+':1;';
      }
    }
  }
  callback(text);
};

Benchmark('Matrix', ({ setup: startup }));
var suite = new Benchmark.Suite;
suite
//.add('a#test', function() { a(matrix); })
.add('a2#test', function() { a2(matrix); })
.add('a21#test', function() { a21(matrix); })
.add('a3#test', function() { a3(text); })
// .add('b#test', function() { b(dict); })
//.add('c#test', function() { c(dict); })
// .add('d#test', function() { d(dict); })
  // .add('String#indexOf', function() { 'Hello World!'.indexOf('o') > -1; })
  // .add('String#match', function() { !!'Hello World!'.match(/o/); })
  // add listeners
.on('cycle', function(event) { 
	benchmarks.add(event.target)
})
.on('complete', function() {
  // console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  benchmarks.log()
});
//.run({ 'async': true }); 
startup(matrix,text, function(text){
  text = text;
  debugger;
  suite.run({'async':true});
});

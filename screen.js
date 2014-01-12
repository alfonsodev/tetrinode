var nc = require('ncurses');
var w = new nc.Window();

var x =  {
	a: function() {  
//		w.clear();
		nc.colorPair(1, 2, 0);
		nc.showCursor = false;
		w.attrset(nc.colorPair(1));
		w.addstr(0,0,'.');
//		w.refresh();
//		w.close();
	},
	b: function() { 
	w.clear();
	nc.colorPair(1, 2, 0);
	nc.showCursor = false;
	w.attrset(nc.colorPair(1));
	w.addstr(0,0,'.');
	w.refresh();
	w.close();
	}
};
x.b();




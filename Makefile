test:
	mocha --reporter spec test/**/*
bro:
	./node_modules/.bin/browserify  -u "/Users/justdoit/wip/t/node_modules/ncurses/index.js" -u "./lib/Interface/Ncurses/index.js" -im  -r ./lib:lib > tetrinode.js
.PHONY: test bro

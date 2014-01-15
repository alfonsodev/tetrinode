CWD = $(shell pwd)
test:
	mocha --reporter spec test/**/*
bro:
	./node_modules/.bin/browserify  -u '$(CWD)/node_modules/ncurses/index.js' -u '$(CWD)/lib/Interface/Ncurses/index.js' -im  -r ./lib:lib > tetrinode.js
play:
	NODE_PATH=./ node bin/tetrinode.js
.PHONY: test bro

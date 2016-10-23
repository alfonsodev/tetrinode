CWD = $(shell pwd)
MOCHA=node_modules/.bin/mocha
ISTANBUL=node_modules/.bin/istanbul
COVERALLS=node_modules/coveralls/bin/coveralls.js
TESTS=$(shell find test/unit -name "test*.js" -not -path "*service/*")
SERVICETEST=$(shell find test/service/ -name "test*.js" )
DEBUG=tetrinode-test*
test:
	NODE_PATH=./ $(MOCHA) -R spec $(TESTS)
test-service:
	$(MOCHA) -R spec $(SERVICETEST)
test-debug:
	$(MOCHA) debug -R spec $(TESTS)
test-coverage:
	# Remove libcov if exits
	rm -rf lib-cov/
	rm -rf html-report/
	NODE_PATH=./ $(ISTANBUL) instrument lib/ -o lib-cov/
	NODE_PATH=./ TETRINODE_COV=1 ISTANBUL_REPORTERS=lcov,text-summary,html $(MOCHA) --reporter mocha-istanbul $(TESTS)
test-coveralls: 
	echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	cat lcov.info | $(COVERALLS)
bro:
	./node_modules/.bin/browserify  -im  -r ./lib:lib > tetrinode.js
play:
	NODE_PATH=./ node bin/tetrinode.js
.PHONY: coverage clean test test-debug test-coverage test-coveralls bro play

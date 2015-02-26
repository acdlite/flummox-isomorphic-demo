WEBPACK_CMD = node_modules/.bin/webpack
NODEMON_CMD = node_modules/.bin/nodemon
BABEL_CMD = node_modules/.bin/babel

BABEL_ARGS = --experimental --source-maps-inline

SRC_JS = $(shell find src -name "*.js")
LIB_JS = $(patsubst src/%.js,lib/%.js,$(SRC_JS))

# Build application
build: js webpack

clean:
	rm -rf lib/
	rm -rf public/js

watch:
	NODE_ENV=development $(MAKE) -j3 watch-js nodemon webpack-dev

nodemon: build
	nodemon lib/server/app.js

# Build application quickly
# Faster on first build, but not after that
fast-build: fast-js build

# Transpile JavaScript using babel
js: $(LIB_JS)

$(LIB_JS): lib/%.js: src/%.js
	mkdir -p $(dir $@) && $(BABEL_CMD) $< -o $@ $(BABEL_ARGS)

fast-js:
	$(BABEL_CMD) src -d lib $(BABEL_ARGS)

watch-js:
	$(BABEL_CMD) src -d lib $(BABEL_ARGS) -w

webpack: public/js/app.js

webpack-dev: $(LIB_JS)
	node --harmony ./lib/server/webpack

public/js/app.js: $(SRC_JS)
	$(WEBPACK_CMD)

.PHONY: build test watch nodemon js clean fast-js watch-js webpack webpack-dev

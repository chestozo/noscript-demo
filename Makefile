STYLUS = node_modules/.bin/stylus
YATE = node_modules/.bin/yate
JSCOLLECT = node_modules/.bin/jscollectd

all: yate css server

yate: templates.yate.js

templates.yate.js: templates.yate
	$(YATE) $< > $@

css: css/all.css

css/all.css: css/all.styl
	$(STYLUS) --resolve-url css/all.styl

server: node/build/server.render.js node/build/server.yate.js

node/build/server.render.js: node/server.render.js js/models.js js/views.js js/layouts.js js/routes.js
	$(JSCOLLECT) --ycssjs node/server.render.js > node/build/server.render.js

node/build/server.yate.js: node/server.yate.js yate node_modules/noscript/yate/noscript-yate-externals.js
	$(JSCOLLECT) --ycssjs node/server.yate.js > node/build/server.yate.js

.PHONY: install all yate css server



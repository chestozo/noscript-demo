STYLUS = node_modules/.bin/stylus
YATE = node_modules/.bin/yate
JSCOLLECT = node_modules/.bin/jscollectd

all: css yate server

yate: templates.yate.js

templates.yate.js: templates.yate
	$(YATE) $< > $@

css: css/all.css

css/all.css: css/all.styl
	$(STYLUS) --resolve-url css/all.styl

server: yate node/build/server.render.js node/build/server.yate.js

node/build/server.render.js: node/server.render.js js/models.js js/views.js js/layouts.js js/routes.js
	$(JSCOLLECT) --ycssjs node/server.render.js > node/build/server.render.js

node/build/server.yate.js: node/server.yate.js node_modules/noscript/yate/noscript-yate-externals.js templates.yate.js
	$(JSCOLLECT) --ycssjs node/server.yate.js > node/build/server.yate.js

.PHONY: install all yate css server



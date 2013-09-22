all: yate

yate: templates.yate.js

templates.yate.js: templates.yate
	node_modules/.bin/yate $< > $@

.PHONY: install all yate

STYLUS = node_modules/.bin/stylus
YATE = node_modules/.bin/yate

all: yate css

yate: templates.yate.js

templates.yate.js: templates.yate
	$(YATE) $< > $@

css: all.css

all.css: all.styl
	$(STYLUS) --resolve-url all.styl

.PHONY: install all yate css

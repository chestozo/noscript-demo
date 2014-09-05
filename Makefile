STYLUS = node_modules/.bin/stylus
YATE = node_modules/.bin/yate

all: yate css

yate: templates.yate.js

templates.yate.js: templates.yate
	$(YATE) $< > $@

css: css/all.css

css/all.css: css/all.styl
	$(STYLUS) --resolve-url css/all.styl

.PHONY: install all yate css

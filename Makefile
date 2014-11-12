STYLUS = node_modules/.bin/stylus
YATE = node_modules/.bin/yate
JSX = node_modules/.bin/jsx

all: yate css jsx

yate: templates.yate.js

templates.yate.js: templates.yate
	$(YATE) $< > $@

css: all.css

all.css: all.styl
	$(STYLUS) --resolve-url all.styl

jsx:
	$(JSX) demo-component.jsx > demo-component.jsx.js

.PHONY: install all yate css jsx

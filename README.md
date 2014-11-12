# noscript-demo
Демо проект для знакомства с MVW фреймворком noscript.

## Setup
```sh
git clone git@github.com:chestozo/noscript-demo.git noscript-demo
cd noscript-demo
npm install
make
# Может потребоваться выполнить `make -B`, если на какой-то стадии криво соберутся yate шаблоны, к примеру.
```

Для примера:
- файлы лежат в директории `~/reps/noscript-demo`
- эта папка видна через браузер как `http://localhost/reps/noscript-demo`

Открываем `http://localhost/reps/noscript-demo/` (важно, что на конце указан слеш).

## ns + react

Чтобы подружить ns и react можно воспользоваться [noscript-bosphorus](https://github.com/yandex-ui/noscript-bosphorus).

Декларируем вид:
```js
ns.View.define('react-view', {
    events: {
        'ns-view-htmlinit': 'onHtmlInit'
    },
    methods: {
        onHtmlInit: function() {
            React.renderComponent(DemoComponent({}), this.node);
        },
        renderComponent: function() {
            return React.renderComponentToString(DemoComponent({}));
        }
    }
});
```

Прописываем в шаблоне вызов метода вида:
```html
match .react-view ns-view-content {
    _html = ns-view-call('renderComponent')
    html(_html)
}
```

Метод `React.renderComponentToString` синхронный и таким образом мы в момент рендеринга прекрасненько рендерим html для компонента, а затем на стадии `ns-view-htmlinit` его оживляем.

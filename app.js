// Урлы.
ns.router.baseDir = '/reps/noscript-demo';
ns.router.routes = {
    route: {
        '/': 'index'
    }
};

// Раскладки (страницы).
ns.layout.define('app', {
    'app': {
        'head': true,
        'content@': {}
    }
});

ns.layout.define('index', {
    'app content@': 'index'
}, 'app');

// Блоки (view).
ns.View.define('app');
ns.View.define('head');
ns.View.define('index');

// Приложение.
var app = {};

app.init = function() {
    ns.init();
    ns.page.go();
};

$(function() {
    app.init();
});

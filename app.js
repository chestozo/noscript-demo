// Урлы.
ns.router.routes = {
    route: {
        '/next': 'next',
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

ns.layout.define('next', {
    'app content@': 'next'
}, 'app');

// Блоки (view).
ns.View.define('app');
ns.View.define('head');
ns.View.define('index');
ns.View.define('next');

// Приложение.
var app = {};

app.init = function() {
    // Поскольку проект может лежать где угодно на файловой системе - инициализируем baseDir руками.
    ns.router.baseDir = location.pathname.substr(0, location.pathname.length - 1);

    ns.init();
    ns.page.go();
};

$(function() {
    app.init();
});

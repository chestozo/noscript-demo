ns.router.routes = {
    route: {
        '/{t=one}': 'index'
    }
};

ns.layout.define('app', {
    'app': {
        'content@': {}
    }
});

ns.layout.define('index', {
    'app content@': {
        'a': null,
        'b': null
    }
}, 'app');

ns.View.define('app');
ns.View.define('index');
ns.View.define('a', { params: { 't': null } });
ns.View.define('b');

$(function() {
    ns.router.baseDir = location.pathname.substr(0, location.pathname.length - 1);

    ns.init();
    ns.page.go();
});

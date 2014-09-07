ns.layout.define('app', {
    'app': {
        'head': true,
        'content@': {}
    }
});

ns.layout.define('index', {
    'app content@': 'index'
}, 'app');

ns.layout.define('demo-github', {
    'app content@': {
        'github-profile': true
    }
}, 'app');

ns.layout.define('photo', {
    'app content@': function(params) {
        return params['image-id']
            ? { 'photos': null, 'photo-preview': null }
            : { 'photos': null };
    }
}, 'app');

var ns = ns || require('noscript');

ns.View.define('app');

ns.View.define('head');

ns.View.define('index');

ns.View.define('photos', {
    models: [ 'photos' ]
});

ns.View.define('photo-preview', {
    models: [ 'photo' ]
});

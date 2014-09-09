/* root: /Users/chestozo/reps/noscript-demo */
/* node/server.render.js: begin [depth 0] */
var request = require('request');

/* js/models.js: begin [depth 1] */
ns.Model.define('photo', {
    params: {
        'image-id': null
    }
});

ns.Model.define('photos', {
    split: {
        items: '.images.image',
        model_id: 'photo',
        params: {
            'id': '.id'
        }
    }
});

ns.Model.define('github-profile', {
    params: {
        'login': null
    },
    methods: {
        request: function() {
            return ns.http('https://api.github.com/users/{login}'.replace('{login}', this.params['login']), {}, { type: 'GET' })
                .then(function(data) {
                    this.setData(data);
                }, function(error) {
                    this.setError(error);
                }, this);
        }
    }
});

// ----------------------------------------------------------------------------------------------------------------- //

// Тестовые данные.
var photos = ns.Model.get('photos').setData({ images: { image: [] } });

photos.insert([
    ns.Model.get('photo', { 'image-id': 1 }).setData({ id: 1, url_: 'http://img-fotki.yandex.ru/get/4522/111182131.5/0_6358f_a0da1182_' }),
    ns.Model.get('photo', { 'image-id': 2 }).setData({ id: 2, url_: 'http://img-fotki.yandex.ru/get/4417/31916371.16/0_5d295_d72044a2_' }),
    ns.Model.get('photo', { 'image-id': 3 }).setData({ id: 3, url_: 'http://img-fotki.yandex.ru/get/4412/47303295.18/0_192ee2_9293c321_' })
]);
/* js/models.js: end */
;
/* js/views.js: begin [depth 1] */
ns.View.define('app');

ns.View.define('head');

ns.View.define('index');

ns.View.define('github-profile', {
    models: [ 'github-profile' ]
});

ns.View.define('photos-item', {
    models: [ 'photo' ]
});

ns.ViewCollection.define('photos', {
    models: [ 'photos' ],
    split: {
        byModel: 'photos',
        intoViews: 'photos-item'
    }
});

ns.View.define('photo-preview', {
    models: [ 'photo' ]
});
/* js/views.js: end */
;
/* js/layouts.js: begin [depth 1] */
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
/* js/layouts.js: end */
;
/* js/routes.js: begin [depth 1] */
ns.router.routes = {
    route: {
        '/photos/{image-id:int}': 'photo',
        '/photos': 'photo',
        '/github/{login}': 'demo-github',
        '/': 'index'
    }
};
/* js/routes.js: end */
;

// FIXME это надо один раз добавлять
ns.http = function(url, params, options) {
    var promise = new Vow.Promise();

    // FIXME fake headers for demo to work with GitHub API.
    var headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36'
    };

    var options = {
        url: url,
        json: true,
        form: params,
        headers: headers
    };

    request.get(options,
        function(error, response, data) {
            if (!error && response.statusCode == 200) {
                promise.fulfill(data);
            } else {
                promise.fulfill({
                    error: 'fail',
                    body: JSON.stringify()
                });
            }
        }
    );
    return promise;
};

// FIXME не очень хорошо, но так мы можем отрендерить всю страницу на сервере.
ns.renderString = function(json, mode, module) {
    if (mode == null) {
        mode = 'server-render';

        json['server-render'] = true;
        json['server-render-models'] = renderContext.models.map(function(m) {
            return {
                id: m.id,
                paramsString: JSON.stringify(m.params),
                dataString: JSON.stringify(m.getData())
            };
        });
    } else {
        // FIXME этого не должно быть, потому что на сервере рендеринг запускается один раз для синхронных видов.
    }

    return yr.run(module || 'main', json, mode);
};
/* node/server.render.js: end */

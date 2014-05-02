// ----------------------------------------------------------------------------------------------------------------- //

// Модели.
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

// ----------------------------------------------------------------------------------------------------------------- //

// Блоки (view).
ns.View.define('app');
ns.View.define('head');
ns.View.define('index');
ns.View.define('photos', {
    models: [ 'photos' ]
});
ns.View.define('photo-preview', {
    models: [ 'photo' ]
});

// ----------------------------------------------------------------------------------------------------------------- //

// Тестовые данные.
var photos = ns.Model.get('photos').setData({ images: { image: [] } });
photos.insert([
    ns.Model.get('photo', { 'image-id': 1 }).setData({ id: 1, url_: 'http://img-fotki.yandex.ru/get/4522/111182131.5/0_6358f_a0da1182_' }),
    ns.Model.get('photo', { 'image-id': 2 }).setData({ id: 2, url_: 'http://img-fotki.yandex.ru/get/4417/31916371.16/0_5d295_d72044a2_' }),
    ns.Model.get('photo', { 'image-id': 3 }).setData({ id: 3, url_: 'http://img-fotki.yandex.ru/get/4412/47303295.18/0_192ee2_9293c321_' })
]);

// ----------------------------------------------------------------------------------------------------------------- //

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

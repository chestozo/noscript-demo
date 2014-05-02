/*
    TODO
    - поддержка авторизованного / неавторизованного
    - redirect
*/

var ns = ns || require('noscript');
require('./app.routes.js');
require('./app.layouts.js');
require('./app.models.js');
require('./app.views.js');

var resolvePage

var processRequest = function(req, res) {
    // Из всей инициализации нужен только роутер.
    ns.router.init();

    // TODO брать урл из запроса.
    var url = '/photos/1';

    // TODO удалить, когда научимся ходить за данными.
    debugInitData();

    // Делаем то, что на клиенте делает ns.page, но без всяких событий, редиректов и т.п.
    // TODO кстати, редиректы надо поддержать...

    var route = ns.router(url);
    var layout = ns.layout.page(route.page, route.params);

    // var update = new ns.Update(ns.MAIN_VIEW, layout, route.params);
    // return update.start();



    // ns.page.go();

    // разрезолвить урл в params
    // выбрать лэйаут
    // запросить нужные данные
    // построить дерево
    // из шаблонизатора получить строку.


    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello');
};





require('http')
    .createServer(processRequest)
    .listen(2014);

// ----------------------------------------------------------------------------------------------------------------- //

function debugInitData() {
    var photos = ns.Model.get('photos').setData({ images: { image: [] } });
    photos.insert([
        ns.Model.get('photo', { 'image-id': 1 }).setData({ id: 1, url_: 'http://img-fotki.yandex.ru/get/4522/111182131.5/0_6358f_a0da1182_' }),
        ns.Model.get('photo', { 'image-id': 2 }).setData({ id: 2, url_: 'http://img-fotki.yandex.ru/get/4417/31916371.16/0_5d295_d72044a2_' }),
        ns.Model.get('photo', { 'image-id': 3 }).setData({ id: 3, url_: 'http://img-fotki.yandex.ru/get/4412/47303295.18/0_192ee2_9293c321_' })
    ]);
}

/*
    TODO
    - поддержка авторизованного / неавторизованного
    - redirect
    - fix extensions (не видит ns - потому что ns должен быть в window ...)
*/

var fs = require('fs');
var jsdom = require('jsdom');
var ns = require('noscript');

var yr = require('./node_modules/yate/lib/yate.js');
require('./node_modules/yate/lib/actions.js');

require('./app.routes.js');
require('./app.layouts.js');
require('./app.models.js');
require('./app.views.js');

var div;

ns.tmpl = function(json, mode, module) {
    var ext_filename = './node_modules/noscript/yate/noscript-yate-externals.js';
    var template_file = './templates.yate';

    var result = yr.run(template_file, { data: json }, ext_filename, mode);
    return ns.html2node(result);

    // div.innerHTML = html;

    // var node = $(div).find('.ns-root')[0];
    // return node;
};

// var initFakeMainView = function() {
//     var mainView = ns.View.create('app');
//     mainView._setNode(div);
//     mainView.invalidate();

//     /**
//      * Корневой View.
//      * @type {ns.View}
//      */
//     ns.MAIN_VIEW = mainView;
// };

var processRequest = function(req, res) {
    // Из всей инициализации нужен только роутер.
    ns.router.init();
    ns.initMainView();

    // initFakeMainView();

    // TODO брать урл из запроса.
    var url = '/photos/1';

    // TODO удалить, когда научимся ходить за данными.
    debugInitData();

    // Делаем то, что на клиенте делает ns.page, но без всяких событий, редиректов и т.п.
    // TODO кстати, редиректы надо поддержать...

    var route = ns.router(url);
    var layout = ns.layout.page(route.page, route.params);

    var update = new ns.Update(ns.MAIN_VIEW, layout, route.params);
    var promise = update.start();

    promise.done(function() {
        console.log(ns.MAIN_VIEW.node.outerHTML);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(ns.MAIN_VIEW.node.outerHTML);
    });
};

jsdom.env(
    fs.readFileSync('./index.html', 'utf-8'),
    [ 'http://code.jquery.com/jquery.js' ],
    function (errors, window) {
        global.$ = window.$;
        global.window = window;
        global.document = window.document;

        ns.View.$window = $(window);
        ns.View.$document = $(document);

        require('http')
            .createServer(processRequest)
            .listen(2014);
    }
);

// ----------------------------------------------------------------------------------------------------------------- //

function debugInitData() {
    var photos = ns.Model.get('photos').setData({ images: { image: [] } });
    photos.insert([
        ns.Model.get('photo', { 'image-id': 1 }).setData({ id: 1, url_: 'http://img-fotki.yandex.ru/get/4522/111182131.5/0_6358f_a0da1182_' }),
        ns.Model.get('photo', { 'image-id': 2 }).setData({ id: 2, url_: 'http://img-fotki.yandex.ru/get/4417/31916371.16/0_5d295_d72044a2_' }),
        ns.Model.get('photo', { 'image-id': 3 }).setData({ id: 3, url_: 'http://img-fotki.yandex.ru/get/4412/47303295.18/0_192ee2_9293c321_' })
    ]);
}

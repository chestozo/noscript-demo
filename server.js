/*
    TODO
    - http запросы
    - redirect
    - поддержка авторизованного / неавторизованного
*/

var fs = require('fs');
var ns = require('noscript');

var yr = require('./node_modules/yate/lib/yate.js');
require('./node_modules/yate/lib/actions.js');

require('./app.routes.js');
require('./app.layouts.js');
require('./app.models.js');
require('./app.views.js');

ns.tmpl = function(json, mode, module) {
    var ext_filename = './node_modules/noscript/yate/noscript-yate-externals.js';
    var template_file = './templates.yate';

    return yr.run(template_file, { data: json }, ext_filename, mode, { ns: ns });
};

var initFakeMainView = function() {
    var mainView = ns.View.create('app');
    mainView._setNode({});
    mainView.invalidate();

    /**
     * Корневой View.
     * @type {ns.View}
     */
    ns.MAIN_VIEW = mainView;
};

var processRequest = function(req, res) {
    // Из всей инициализации нужен только роутер.
    ns.router.init();
    initFakeMainView();
    ns.request.URL = 'http://localhost:2114/'

    // TODO брать урл из запроса.
    var url = '/photos/1';

    // Делаем то, что на клиенте делает ns.page, но без всяких событий, редиректов и т.п.
    // TODO кстати, редиректы надо поддержать...

    var route = ns.router(url);
    var layout = ns.layout.page(route.page, route.params);

    var update = new ns.Update(ns.MAIN_VIEW, layout, route.params, { syncOnly: true, renderOnly: true });
    var promise = update.start();

    promise.done(function(html) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    });
};

require('http')
    .createServer(processRequest)
    .listen(2014);

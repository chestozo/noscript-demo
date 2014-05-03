/*
    TODO
    - поддержка redirect от ns.router
    - поддержка заголовков в http запросах (про авторизованного / неавторизованного)
*/

var fs = require('fs');
var request = require('request');
var no = require('nommon');
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

ns.http = function(url, params, options) {
    var promise = new no.Promise();
    var options = {
        url: url,
        json: true,
        form: params,
        // headers: headers
    };

    request.post(options,
        function(error, response, data) {
            if (!error && response.statusCode == 200) {
                promise.resolve(data);
            } else {
                var error = errorThrown || textStatus || 'unknown error';
                promise.resolve({
                    error: 'fail'
                });
            }
        }
    );
    return promise;
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

    // Главный вид - фейковый, у нас нет DOM-а.
    initFakeMainView();

    ns.request.URL = 'http://localhost:2114/'

    // TODO брать урл из запроса.
    var url = '/photos';
    // var url = '/photos/1';

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

/**
    TODO
    - множественный запуск
    - избавиться от ns-root обёртки
    - fix всех FIXME
    - использовать ns.update.reconstruct
*/

var vm = require('vm');
var fs = require('fs');
var path = require('path');
var ph = {};

var Vow = require('../node_modules/noscript/node_modules/vow/lib/vow.js');
var no = require('../node_modules/noscript/node_modules/nommon/lib/index.js');
var noscript = require('../node_modules/noscript/dist/noscript.module.js');

var yr = require('./build/server.yate.js');

// FIXME это надо один раз добавлять
var renderPage = function(html, models) {
    var initScript = '';
    var model;

    for (var i = 0; i < models.length; i++) {
        model = models[i];
        initScript += "ns.Model.get('%id%', %params%).setData(%data%);"
            .replace('%id%', model.id)
            .replace('%params%', JSON.stringify(model.params))
            .replace('%data%', JSON.stringify(model.getData()));
    }

    initScript = '<script>' +
        'var __nsInit = function() {' +
        initScript +
        '};' +
        '</script>';

    return '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
        '<title>demo</title>' +
        '<meta charset="utf-8">' +
        '<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7,IE=edge">' +
        '<link rel="stylesheet" href="/css/all.css">' +
        '<script src="/js/jquery.min.js"></script>' +
        '<script src="/node_modules/es5-shim/es5-shim.min.js"></script>' +
        '<script src="/node_modules/yate/lib/runtime.js"></script>' +
        '<script src="/node_modules/noscript/dist/noscript.js"></script>' +
        '<script src="/node_modules/noscript/yate/noscript-yate-externals.js"></script>' +
        '<script src="/templates.yate.js"></script>' +
        '<script src="/js/models.js"></script>' +
        '<script src="/js/views.js"></script>' +
        '<script src="/js/layouts.js"></script>' +
        '<script src="/js/routes.js"></script>' +
        '<script src="/js/app.js"></script>' +
    '</head>' +
    '<body class="page-body">' +

        html +
        initScript +

        // '<div id="app">' +
        //     '<p style="margin: 3em 0; text-align: center;">' +
        //         'Загрузка...' +
        //     '</p>' +
        // '</div>' +
    '</body>' +
    '</html>';
};

var processRequest = function(req, res) {
    var ns = noscript();
    var script = fs.readFileSync(path.resolve(__dirname, './build/server.render.js'), 'utf-8');

    var global_variables = {
        no: no,
        ns: ns,
        require: require,
        console: console,
        Vow: Vow,
        yr: yr
    };

    var url = req.url;

    // FIXME хардкодисто
    if (url !== '/github/suholet') {
        res.writeHead(404);
        res.end();
        return;
    }

    var context = vm.createContext(global_variables);
    vm.runInContext(script, context);

    ns.router.init();
    ns.MAIN_VIEW = ns.View.create('app');

    var route = ns.router(url);
    var layout = ns.layout.page(route.page, route.params);
    var update = new ns.Update(ns.MAIN_VIEW, layout, route.params);
    var modelsPromise;

    var generateHTML = function(update) {
        update.log('started `generateHTML` scenario');

        modelsPromise = update._requestSyncModels();
        modelsPromise
            .then(update._generateHTML, null, update)
            .then(update._fulfill, update._reject, update);

        return update.promise;
    };

    generateHTML(update)
        .then(function(result) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(renderPage(result, modelsPromise.valueOf()));
        })
        .fail(function() {
            res.writeHead(400);
            res.end();
        });

    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.end('Hi');
};

require('http')
    .createServer(processRequest)
    .listen(2014);

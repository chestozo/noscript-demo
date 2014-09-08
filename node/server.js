/**
    TODO
    - использовать ns.update.reconstruct
    - fix всех FIXME
*/

var vm = require('vm');
var fs = require('fs');
var path = require('path');

var Vow = require('../node_modules/noscript/node_modules/vow/lib/vow.js');
var no = require('../node_modules/noscript/node_modules/nommon/lib/index.js');
var noscript = require('../node_modules/noscript/dist/noscript.module.js');

// FIXME может быть это и ок, что мы добавляем yr в global. Иначе не работает рендеринг (ns не видит yr).
var yr = global.yr = require('./build/server.yate.js');

var processRequest = function(req, res) {
    var ph = {};
    var ns = noscript();
    var script = fs.readFileSync(path.resolve(__dirname, './build/server.render.js'), 'utf-8');

    var global_variables = {
        no: no,
        ns: ns,
        require: require,
        console: console,
        Vow: Vow,
        yr: yr,
        ph: ph
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
            .then(function(models) {
                ph.models = models;
                return modelsPromise;
            })
            .then(update._generateHTML, null, update)
            .then(update._fulfill, update._reject, update);

        return update.promise;
    };

    generateHTML(update)
        .then(function(html) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        })
        .fail(function() {
            console.error(arguments);
            res.writeHead(400);
            res.end();
        });
};

require('http')
    .createServer(processRequest)
    .listen(2014);

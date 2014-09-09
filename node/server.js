/**
    TODO
    - fix всех FIXME
    - fix title render
*/

var vm = require('vm');
var fs = require('fs');
var path = require('path');

var Vow = require('../node_modules/noscript/node_modules/vow/lib/vow.js');
var no = require('../node_modules/noscript/node_modules/nommon/lib/index.js');
var noscript = require('../node_modules/noscript/dist/noscript.module.js');

// FIXME может быть это и ок, что мы добавляем yr в global. Иначе не работает рендеринг (ns не видит yr).
// FIXME вообще-то уже можно удалить yr из global, потому что мы переопределили ns.rederString().
var yr = global.yr = require('./build/server.yate.js');
var renderScript = fs.readFileSync(path.resolve(__dirname, './build/server.render.js'), 'utf-8');

var processRequest = function(req, res) {
    var url = req.url;

    // FIXME хардкодисто
    if (url.indexOf('/github/') < 0) {
        res.writeHead(404);
        res.end();
        return;
    }

    // На каждый запрос - новый инстанс noscript и новый renderContext объект.
    var renderContext = {};
    var ns = noscript();

    var global_variables = {
        no: no,
        ns: ns,
        require: require,
        console: console,
        Vow: Vow,
        yr: yr,
        renderContext: renderContext
    };

    var context = vm.createContext(global_variables);
    vm.runInContext(renderScript, context);

    ns.router.init();
    ns.MAIN_VIEW = ns.View.create('app');

    var route = ns.router(url);
    var layout = ns.layout.page(route.page, route.params);
    var update = new ns.Update(ns.MAIN_VIEW, layout, route.params);
    var modelsPromise;

    // FIXME пришлось переопределить ns.update.generateHTML, иначе нельзя было подкопаться к моделям,
    // которые запрашиваются в рамках этого ns.update.
    var generateHTML = function(update) {
        update.log('started `generateHTML` scenario');

        modelsPromise = update._requestSyncModels();
        modelsPromise
            .then(function(models) {
                renderContext.models = models;
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

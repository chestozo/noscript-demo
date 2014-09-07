var vm = require('vm');
var fs = require('fs');
var path = require('path');
var ph = {};

var yr = require('../node_modules/yate/lib/runtime.js');
var Vow = require('../node_modules/noscript/node_modules/vow/lib/vow.js');
var no = require('../node_modules/noscript/node_modules/nommon/lib/index.js');
var noscript = require('../node_modules/noscript/dist/noscript.module.js');

var processRequest = function(req, res) {
    var ns = noscript();
    var script = fs.readFileSync(path.resolve(__dirname, './render.js'), 'utf-8');

    var global_variables = {
        __dirname: __dirname,
        no: no,
        ns: ns,
        require: require,
        console: console,
        Vow: Vow,
        yr: yr,
        ph: ph
    };

    vm.runInNewContext(script, global_variables);

    ns.router.init();
    ns.MAIN_VIEW = ns.View.create('app');

    var url = req.url;

    if (url === '/favicon.ico') {
        res.writeHead(404);
        res.end();
        return;
    }

    var route = ns.router(url);
    var layout = ns.layout.page(route.page, route.params);
    var update = new ns.Update(ns.MAIN_VIEW, layout, route.params);

    update.generateHTML()
        .then(function(result) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(ph.renderPage(result));
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

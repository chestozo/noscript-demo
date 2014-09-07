var path = require('path');
var fs = require('fs');
var vm = require('vm');
var request = require('request');


var global_variables = {
    no: no,
    ns: ns,
    require: require,
    console: console,
    Vow: Vow,
    yr: yr
};

// FIXME как-то это хреново. Лучше собирать скрипт для сервера видимо.
var loadScript = function(filename, globals) {
    var script = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
    vm.runInNewContext(script, global_variables);
};

loadScript('../js/models.js');
loadScript('../js/views.js');
loadScript('../js/layouts.js');
loadScript('../js/routes.js');

loadScript('../node_modules/noscript/yate/noscript-yate-externals.js');
loadScript('../templates.yate.js');

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

// FIXME как-то не очень опять определять это всё :)
ns.renderString = function(json, mode, module) {
    return yr.run(module || 'main', json, mode);
};

///

ph.renderPage = function(html, models) {
    var initScript = '';

    // console.log('models', models);

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

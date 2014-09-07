// <script src="/node_modules/yate/lib/runtime.js"></script>
// <script src="/node_modules/noscript/yate/noscript-yate-externals.js"></script>
// <script src="/templates.yate.js"></script>

var path = require('path');
var fs = require('fs');
var vm = require('vm');

var global_variables = {
    no: no,
    ns: ns,
    require: require,
    console: console
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

ns.http = function(url, params, options) {
    var promise = new Vow.Promise();
    var options = {
        url: url,
        json: true,
        form: params,
        // headers: headers
    };

    request.post(options,
        function(error, response, data) {
            if (!error && response.statusCode == 200) {
                promise.fulfill(data);
            } else {
                var error = errorThrown || textStatus || 'unknown error';
                promise.fulfill({
                    error: 'fail'
                });
            }
        }
    );
    return promise;
};

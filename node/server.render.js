var request = require('request');

include('../js/models.js');
include('../js/views.js');
include('../js/layouts.js');
include('../js/routes.js');

// FIXME это надо один раз добавлять
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

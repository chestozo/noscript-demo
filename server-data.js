var photos = [
    { id: 1, url_: 'http://img-fotki.yandex.ru/get/4522/111182131.5/0_6358f_a0da1182_'  },
    { id: 2, url_: 'http://img-fotki.yandex.ru/get/4417/31916371.16/0_5d295_d72044a2_'  },
    { id: 3, url_: 'http://img-fotki.yandex.ru/get/4412/47303295.18/0_192ee2_9293c321_' }
];

var processRequest = function(req, res) {
    var models = [];
    switch (req.url) {
        case '/models?_m.0=photo&_model.0=photo&photo-id.0=1':
            models.push(photos[0]);
            break;
    }

    res.writeHead(
        200, {
            'Content-Type': 'application/javascript',
            'Access-Control-Allow-Origin': '*'
        }
    );
    res.end(JSON.stringify(models));
};

require('http')
    .createServer(processRequest)
    .listen(2114);

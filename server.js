var ns = ns || require('noscript');
require('./app.routes.js')

/*
    TODO
    - поддержка авторизованного / неавторизованного
 */

var processRequest = function(req, res) {
    // Пока неавторизованный

    // разрезолвить урл в params
    // выбрать лэйаут
    // запросить нужные данные
    // построить дерево
    // из шаблонизатора получить строку.


    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello');
};

require('http')
    .createServer(processRequest)
    .listen(2014);

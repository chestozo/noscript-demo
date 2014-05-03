$(function() {
    // Поскольку проект может лежать где угодно на файловой системе - инициализируем baseDir руками.
    ns.router.baseDir = location.pathname.substr(0, location.pathname.length - 1);

    // Тут надо поднять руками тестовый хост с данными `node server-data.js`.
    ns.request.URL = 'http://localhost:2114/'

    ns.init();
    ns.page.go();
});

var app = {};

app.init = function() {
    ns.init();

    // Если есть __nsInit функция (название произвольное) - значит страница уже отренедерена и данные для асинхронных видов уже есть.
    // Нужно воссоздать виды (из существующего HTML).
    if (typeof __nsInit === 'function') {
        __nsInit();

        var url = ns.page.getCurrentUrl();
        var route = ns.router(url);
        var layout = ns.layout.page(route.page, route.params);
        var update = new ns.Update(ns.MAIN_VIEW, layout, route.params);
        ns.page._setCurrent(route, url);

        var node = $('body')[0];

        update.reconstruct(node)
            .then(function() {
                ns.page.go(ns.page.currentUrl, 'preserve');
            });
    } else {
        ns.page.go();
    }
};

$(function() {
    // ns.DEBUG = true;
    app.init();
});

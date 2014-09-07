var app = {};

app.init = function() {
    ns.init();

    // Если есть __nsInit функция (название произвольное) - значит страница уже отренедерена и данные для асинхронных видов уже есть.
    // Нужно воссоздать виды (из существующего HTML).
    if (typeof __nsInit === 'function') {
        __nsInit();
    }

    ns.page.go();
};

$(function() {
    app.init();
});

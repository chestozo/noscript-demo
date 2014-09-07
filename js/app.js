var app = {};

app.init = function() {
    ns.init();

    if (typeof __phInit === 'function') {
        __phInit();
    }

    ns.page.go();
};

$(function() {
    app.init();
});

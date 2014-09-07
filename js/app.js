var app = {};

app.init = function() {
    ns.init();
    ns.page.go();
};

$(function() {
    app.init();
});

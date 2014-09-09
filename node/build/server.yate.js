/* root: /Users/chestozo/reps/noscript-demo */
/* node/server.yate.js: begin [depth 0] */
/**
    В node.js модули загруженные через require кэшируются.
    Поэтому мы один раз готовим всё рендеринга в yate.
*/
var yr = require('../../node_modules/yate/lib/runtime.js');

/* node_modules/noscript/yate/noscript-yate-externals.js: begin [depth 1] */
/**
 * Мост к ns.router.url
 * @param {string} path Урл.
 * @returns {string}
 */
yr.externals['ns-url'] = function(path) {
    return ns.router.url(path);
};

/**
 * Мост к ns.router.generateUrl.
 * @param {string} id Название layout.
 * @param {object} params Параметры для урла.
 * @returns {string}
 */
yr.externals['ns-generate-url'] = function(id, params) {
    return ns.router.generateUrl(id, params);
};
/* node_modules/noscript/yate/noscript-yate-externals.js: end */
;
/* templates.yate.js: begin [depth 1] */
var yr = yr || require('yate/lib/runtime.js');

(function() {

    var cmpNN = yr.cmpNN;
    var cmpSN = yr.cmpSN;
    var nodeset2xml = yr.nodeset2xml;
    var nodeset2boolean = yr.nodeset2boolean;
    var nodeset2attrvalue = yr.nodeset2attrvalue;
    var nodeset2scalar = yr.nodeset2scalar;
    var scalar2attrvalue = yr.scalar2attrvalue;
    var xml2attrvalue = yr.xml2attrvalue;
    var scalar2xml = yr.scalar2xml;
    var xml2scalar = yr.xml2scalar;
    var simpleScalar = yr.simpleScalar;
    var simpleBoolean = yr.simpleBoolean;
    var selectNametest = yr.selectNametest;
    var closeAttrs = yr.closeAttrs;

    var M = new yr.Module();

    var j0 = [ 0, 'status' ];

    function p0(m, c0, i0, l0) {
        return cmpSN("ok", selectNametest('status', c0, []));
    }

    var j1 = [ 0, 'models', 0, '*', 2, p0 ];

    M.k0 = {};
    M.k0.n = function k0n(m, c0, i0, l0) {
        return m.s(j1, c0.doc.root);
    };
    //  scalar
    M.k0.u = function k0u(m, c0, i0, l0) {
        return c0.name;
    };
    //  nodeset
    M.k0.b = function k0b(m, c0, i0, l0, a0) {
        var r0 = [];

        function p1(m, c0, i0, l0) {
            return c0.name != "status";
        }

        var j2 = [ 0, '*', 2, p1 ];

        r0 = m.s(j2, c0);

        return r0;
    };
    M.k0.ut = 'scalar';
    M.k0.bt = 'nodeset';

    function p2(m, c0, i0, l0) {
        return cmpSN("error", selectNametest('status', c0, []));
    }

    var j3 = [ 0, 'models', 0, '*', 2, p2 ];

    M.k1 = {};
    M.k1.n = function k1n(m, c0, i0, l0) {
        return m.s(j3, c0.doc.root);
    };
    //  scalar
    M.k1.u = function k1u(m, c0, i0, l0) {
        return c0.name;
    };
    //  nodeset
    M.k1.b = function k1b(m, c0, i0, l0, a0) {
        var r0 = [];

        function p3(m, c0, i0, l0) {
            return c0.name != "status";
        }

        var j4 = [ 0, '*', 2, p3 ];

        r0 = m.s(j4, c0);

        return r0;
    };
    M.k1.ut = 'scalar';
    M.k1.bt = 'nodeset';

    var j5 = [ ];

    var j6 = [ 0, 'views', 0, '*' ];

    var j7 = [ 0, '*' ];

    var j8 = [ 1, 0 ];

    var j9 = [ 0, 'tree', 0, '*' ];

    var j10 = [ 0, 'state' ];

    var j11 = [ 0, 'key' ];

    var j12 = [ 0, 'collection' ];

    var j13 = [ 0, 'views', 0, '*' ];

    var j14 = [ 0, 'views', 0, 'ns-view-collection-container', 0, '*' ];

    var j15 = [ 0, 'server-render' ];

    function p4(m, c0, i0, l0) {
        return simpleBoolean('server-render', c0);
    }

    var j16 = [ 0, '*', 2, p4 ];

    var j17 = [ 0, 'server-render-models' ];

    var j18 = [ 0, 'id' ];

    var j19 = [ 0, 'paramsString' ];

    var j20 = [ 0, 'dataString' ];

    var j21 = [ 0, 'head' ];

    var j22 = [ 0, 'index' ];

    var j23 = [ 0, 'github-profile' ];

    var j24 = [ 0, 'avatar_url' ];

    var j25 = [ 0, 'html_url' ];

    var j26 = [ 0, 'login' ];

    var j27 = [ 0, 'photos' ];

    var j28 = [ 0, 'photos-item' ];

    var j29 = [ 0, 'url_' ];

    var j30 = [ 0, 'photo-preview' ];

    // match /
    M.t0 = function t0(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("ns-root")
        };
        a0.s = 'div';
        r0 += m.a(m, m.s(j6, c0), 'ns-view', a0)
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t0.j = 1;
    M.t0.a = 1;

    // match .* : ns-view
    M.t1 = function t1(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += m.a(m, m.n(j9, yr.document(m.s(j8, c0))), 'ns-build-view', a0)

        return r0;
    };
    M.t1.j = j7;
    M.t1.a = 0;

    // match .* : ns-build-view
    M.t2 = function t2(m, c0, i0, l0, a0) {
        var r0 = '';

        //  var state : scalar
        var v0 = simpleScalar('state', c0.doc.root);

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("ns-view-" + ( c0.name )),
            'data-key': new yr.scalarAttr(nodeset2scalar( ( selectNametest('key', c0.doc.root, []) ) ))
        };
        a0.s = 'div';
        if (v0 == "placeholder") {
            var tmp0 = a0.a[ "class" ];
            if (tmp0) {
                a0.a[ "class" ] = tmp0.addscalar(" ns-view-placeholder");
            } else {
                a0.a[ "class" ] = new yr.scalarAttr(" ns-view-placeholder");
            }
            if (nodeset2boolean( (selectNametest('collection', c0.doc.root, [])) )) {
                r0 += m.a(m, m.s(j8, c0), 'ns-view-collection', a0)
            } else {
                r0 += m.a(m, m.s(j8, c0), 'ns-view-desc', a0)
            }
        } else {
            var r1 = '';
            var a1 = { a: {} };
            r1 += m.a(m, m.s(j8, c0), 'ns-view-add-class', a1)
            var tmp0 = a0.a[ "class" ];
            if (tmp0) {
                a0.a[ "class" ] = tmp0.addxml(r1);
            } else {
                a0.a[ "class" ] = new yr.xmlAttr(r1);
            }
            r0 += m.a(m, m.s(j8, c0), 'ns-view-add-attrs', a0)
            if (v0 == "loading") {
                r0 += m.a(m, m.s(j8, c0), 'ns-view-async-content', a0)
            } else if (v0 == "error") {
                r0 += m.a(m, m.s(j8, c0), 'ns-view-error-content', a0)
            } else {
                r0 += m.a(m, m.s(j8, c0), 'ns-view-content', a0)
            }
        }
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t2.j = j7;
    M.t2.a = 0;

    // match .* : ns-view-add-class
    M.t3 = function t3(m, c0, i0, l0, a0) {
        var r0 = '';

        return r0;
    };
    M.t3.j = j7;
    M.t3.a = 0;

    // match .* : ns-view-add-attrs
    M.t4 = function t4(m, c0, i0, l0, a0) {
        var r0 = '';

        return r0;
    };
    M.t4.j = j7;
    M.t4.a = 0;

    // match .* : ns-view-content
    M.t5 = function t5(m, c0, i0, l0, a0) {
        var r0 = '';

        if (nodeset2boolean( (selectNametest('collection', c0.doc.root, [])) )) {
            r0 += closeAttrs(a0);
            r0 += "<div";
            a0.a = {
                'class': new yr.scalarAttr("ns-view-container-desc")
            };
            a0.s = 'div';
            r0 += m.a(m, m.s(j8, c0), 'ns-view-collection', a0)
            r0 += closeAttrs(a0);
            r0 += "</div>";
        } else {
            r0 += m.a(m, m.s(j8, c0), 'ns-view-desc', a0)
        }

        return r0;
    };
    M.t5.j = j7;
    M.t5.a = 0;

    // match .* : ns-view-desc
    M.t6 = function t6(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += m.a(m, m.s(j13, c0.doc.root), 'ns-view', a0)

        return r0;
    };
    M.t6.j = j7;
    M.t6.a = 0;

    // match .* : ns-view-collection
    M.t7 = function t7(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += m.a(m, m.s(j14, c0.doc.root), 'ns-view', a0)

        return r0;
    };
    M.t7.j = j7;
    M.t7.a = 0;

    // match .* : ns-view-async-content
    M.t8 = function t8(m, c0, i0, l0, a0) {
        var r0 = '';

        return r0;
    };
    M.t8.j = j7;
    M.t8.a = 0;

    // match .* : ns-view-error-content
    M.t9 = function t9(m, c0, i0, l0, a0) {
        var r0 = '';

        return r0;
    };
    M.t9.j = j7;
    M.t9.a = 0;

    // match / : server-render
    M.t10 = function t10(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += closeAttrs(a0);
        r0 += "<!DOCTYPE html>";
        r0 += "<html>";
        r0 += "<head>";
        r0 += "<title>" + "demo" + "</title>";
        r0 += "<meta charset=\"" + "utf-8" + "\"/>";
        r0 += "<meta http-equiv=\"" + "X-UA-Compatible" + "\" content=\"" + "IE=EmulateIE7,IE=edge" + "\"/>";
        r0 += "<link rel=\"" + "stylesheet" + "\" href=\"" + "/css/all.css" + "\"/>";
        r0 += "<script src=\"" + "/js/jquery.min.js" + "\"></script>";
        r0 += "<script src=\"" + "/node_modules/es5-shim/es5-shim.min.js" + "\"></script>";
        r0 += "<script src=\"" + "/node_modules/yate/lib/runtime.js" + "\"></script>";
        r0 += "<script src=\"" + "/node_modules/noscript/dist/noscript.js" + "\"></script>";
        r0 += "<script src=\"" + "/node_modules/noscript/yate/noscript-yate-externals.js" + "\"></script>";
        r0 += "<script src=\"" + "/templates.yate.js" + "\"></script>";
        r0 += "<script src=\"" + "/js/models.js" + "\"></script>";
        r0 += "<script src=\"" + "/js/views.js" + "\"></script>";
        r0 += "<script src=\"" + "/js/layouts.js" + "\"></script>";
        r0 += "<script src=\"" + "/js/routes.js" + "\"></script>";
        r0 += "<script src=\"" + "/js/app.js" + "\"></script>";
        r0 += "</head>";
        r0 += "<body";
        a0.a = {
            'class': new yr.scalarAttr("page-body")
        };
        a0.s = 'body';
        r0 += m.a(m, m.s(j8, c0), 'server-render-body', a0)
        r0 += closeAttrs(a0);
        r0 += "</body>";
        r0 += "</html>";

        return r0;
    };
    M.t10.j = 1;
    M.t10.a = 1;

    // match .* : server-render-body
    M.t11 = function t11(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += closeAttrs(a0);
        r0 += "<div id=\"" + "app" + "\">";
        r0 += "<p style=\"" + "margin: 3em 0; text-align: center;" + "\">";
        r0 += "Загрузка...";
        r0 += "</p>";
        r0 += "</div>";

        return r0;
    };
    M.t11.j = j7;
    M.t11.a = 0;

    // match .*[ .server-render ] : server-render-body
    M.t12 = function t12(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += m.a(m, m.s(j6, c0), 'ns-view', a0)
        r0 += closeAttrs(a0);
        r0 += "<script>";
        r0 += "var __nsInit = function() {\n";
        var items0 = selectNametest('server-render-models', c0, []);
        for (var i1 = 0, l1 = items0.length; i1 < l1; i1++) {
            var c1 = items0[ i1 ];
            r0 += "ns.Model.get('" + nodeset2xml( ( selectNametest('id', c1, []) ) ) + "', " + nodeset2xml( ( selectNametest('paramsString', c1, []) ) ) + ").setData(" + nodeset2xml( ( selectNametest('dataString', c1, []) ) ) + ");\n";
        }
        r0 += "};";
        r0 += "</script>";

        return r0;
    };
    M.t12.j = j16;
    M.t12.a = 0;

    // match .head : ns-view-add-class
    M.t13 = function t13(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += closeAttrs(a0);
        r0 += " island head";

        return r0;
    };
    M.t13.j = j21;
    M.t13.a = 0;

    // match .head : ns-view-content
    M.t14 = function t14(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += closeAttrs(a0);
        r0 += "Шапка: она не меняется от страницы к странице";

        return r0;
    };
    M.t14.j = j21;
    M.t14.a = 0;

    // match .index : ns-view-add-class
    M.t15 = function t15(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += closeAttrs(a0);
        r0 += " island";

        return r0;
    };
    M.t15.j = j22;
    M.t15.a = 0;

    // match .index : ns-view-content
    M.t16 = function t16(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += closeAttrs(a0);
        r0 += "Это индекс страница. На ней ничего нет.";
        r0 += "<br/>";
        r0 += "<br/>";
        r0 += "Зато можно перейти к ";
        r0 += "<a href=\"" + scalar2attrvalue( ( (yr.externals['ns-url'])("/photos") ) ) + "\">" + "следующей странице" + "</a>";
        r0 += ".";

        return r0;
    };
    M.t16.j = j22;
    M.t16.a = 0;

    // match .github-profile : ns-view-add-class
    M.t17 = function t17(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += closeAttrs(a0);
        r0 += " island";

        return r0;
    };
    M.t17.j = j23;
    M.t17.a = 0;

    // match .github-profile : ns-view-content
    M.t18 = function t18(m, c0, i0, l0, a0) {
        var r0 = '';

        //  var profile : nodeset
        var v1 = m.k('k0', "github-profile", c0.doc.root);

        a0.a[ "style" ] = new yr.scalarAttr("vertical-align: top;");
        r0 += closeAttrs(a0);
        r0 += "<img src=\"" + nodeset2attrvalue( ( m.n(j24, v1) ) ) + "\" width=\"" + "60" + "\" style=\"" + "display: inline-block; margin-right: 0.5em;" + "\"/>";
        r0 += "<a href=\"" + nodeset2attrvalue( ( m.n(j25, v1) ) ) + "\" style=\"" + "vertical-align: top;" + "\">" + nodeset2xml( ( m.n(j26, v1) ) ) + "</a>";
        r0 += "<br/>";
        r0 += "<br/>";
        r0 += "<a href=\"" + "/github/i2r" + "\">" + "i2r@" + "</a>";
        r0 += "<br/><a href=\"" + "/github/chestozo" + "\">" + "chestozo@" + "</a>";
        r0 += "<br/><a href=\"" + "/github/suholet" + "\">" + "suholet@" + "</a>";

        return r0;
    };
    M.t18.j = j23;
    M.t18.a = 0;

    // match .photos : ns-view-add-class
    M.t19 = function t19(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += closeAttrs(a0);
        r0 += " island";

        return r0;
    };
    M.t19.j = j27;
    M.t19.a = 0;

    // match .photos : ns-view-collection
    M.t20 = function t20(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += closeAttrs(a0);
        r0 += "К примеру, вот фотки:";
        r0 += "<br/>";
        r0 += m.a(m, m.s(j14, c0.doc.root), 'ns-view', a0)

        return r0;
    };
    M.t20.j = j27;
    M.t20.a = 0;

    // match .photos-item : ns-view-add-class
    M.t21 = function t21(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += closeAttrs(a0);
        r0 += " image-thumb";

        return r0;
    };
    M.t21.j = j28;
    M.t21.a = 0;

    // match .photos-item : ns-view-content
    M.t22 = function t22(m, c0, i0, l0, a0) {
        var r0 = '';

        //  var photo : nodeset
        var v2 = m.k('k0', "photo", c0.doc.root);

        r0 += closeAttrs(a0);
        r0 += "<a href=\"" + scalar2attrvalue( ( (yr.externals['ns-url'])("/photos/" + nodeset2scalar( m.n(j18, v2) )) ) ) + "\">";
        r0 += "<img src=\"" + nodeset2attrvalue( ( m.n(j29, v2) ) ) + "XXS" + "\"/>";
        r0 += "</a>";

        return r0;
    };
    M.t22.j = j28;
    M.t22.a = 0;

    // match .photo-preview : ns-view-add-class
    M.t23 = function t23(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += closeAttrs(a0);
        r0 += " island";

        return r0;
    };
    M.t23.j = j30;
    M.t23.a = 0;

    // match .photo-preview : ns-view-content
    M.t24 = function t24(m, c0, i0, l0, a0) {
        var r0 = '';

        r0 += closeAttrs(a0);
        r0 += "А вот и превью:";
        r0 += "<br/>";
        r0 += "<br/>";
        r0 += "<img src=\"" + nodeset2attrvalue( ( m.n(j29, m.k('k0', "photo", c0.doc.root)) ) ) + "L" + "\"/>";

        return r0;
    };
    M.t24.j = j30;
    M.t24.a = 0;

    M.matcher = {
        "": {
            "": [
                "t0"
            ]
        },
        "ns-view": {
            "*": [
                "t1"
            ]
        },
        "ns-build-view": {
            "*": [
                "t2"
            ]
        },
        "ns-view-add-class": {
            "*": [
                "t3"
            ],
            "head": [
                "t13",
                "t3"
            ],
            "index": [
                "t15",
                "t3"
            ],
            "github-profile": [
                "t17",
                "t3"
            ],
            "photos": [
                "t19",
                "t3"
            ],
            "photos-item": [
                "t21",
                "t3"
            ],
            "photo-preview": [
                "t23",
                "t3"
            ]
        },
        "ns-view-add-attrs": {
            "*": [
                "t4"
            ]
        },
        "ns-view-content": {
            "*": [
                "t5"
            ],
            "head": [
                "t14",
                "t5"
            ],
            "index": [
                "t16",
                "t5"
            ],
            "github-profile": [
                "t18",
                "t5"
            ],
            "photos-item": [
                "t22",
                "t5"
            ],
            "photo-preview": [
                "t24",
                "t5"
            ]
        },
        "ns-view-desc": {
            "*": [
                "t6"
            ]
        },
        "ns-view-collection": {
            "*": [
                "t7"
            ],
            "photos": [
                "t20",
                "t7"
            ]
        },
        "ns-view-async-content": {
            "*": [
                "t8"
            ]
        },
        "ns-view-error-content": {
            "*": [
                "t9"
            ]
        },
        "server-render": {
            "": [
                "t10"
            ]
        },
        "server-render-body": {
            "*": [
                "t12",
                "t11"
            ]
        }
    };
    M.imports = [];

    yr.register('main', M);

})();
/* templates.yate.js: end */
;

module.exports = yr;
/* node/server.yate.js: end */

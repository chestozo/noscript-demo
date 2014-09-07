// <script src="/node_modules/yate/lib/runtime.js"></script>
// <script src="/node_modules/noscript/yate/noscript-yate-externals.js"></script>
// <script src="/templates.yate.js"></script>

// FIXME global как-то не особо круто...
var ns = global.ns = require('../node_modules/noscript/dist/noscript.module.js')();

require('../js/models.js');
require('../js/views.js');
require('../js/layouts.js');
require('../js/routes.js');

console.log(ns.Model.get('photos').isValid());

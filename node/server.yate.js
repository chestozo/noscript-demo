/**
    В node.js модули загруженные через require кэшируются.
    Поэтому мы один раз готовим всё рендеринга в yate.
*/
var yr = require('../../node_modules/yate/lib/runtime.js');

include('../node_modules/noscript/yate/noscript-yate-externals.js');
include('../templates.yate.js');

module.exports = yr;

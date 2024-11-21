"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    PagesAPIRouteMatcher: null,
    PagesAPILocaleRouteMatcher: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PagesAPIRouteMatcher: function() {
        return PagesAPIRouteMatcher;
    },
    PagesAPILocaleRouteMatcher: function() {
        return PagesAPILocaleRouteMatcher;
    }
});
const _localeroutematcher = require("./locale-route-matcher");
const _routematcher = require("./route-matcher");
class PagesAPIRouteMatcher extends _routematcher.RouteMatcher {
}
class PagesAPILocaleRouteMatcher extends _localeroutematcher.LocaleRouteMatcher {
}

//# sourceMappingURL=pages-api-route-matcher.js.map
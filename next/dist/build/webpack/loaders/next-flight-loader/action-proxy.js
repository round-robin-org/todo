"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createActionProxy", {
    enumerable: true,
    get: function() {
        return createActionProxy;
    }
});
const SERVER_REFERENCE_TAG = Symbol.for("react.server.reference");
function createActionProxy(id, boundArgsFromClosure, action, originalAction) {
    function bindImpl(_, ...boundArgs) {
        const currentAction = this;
        const newAction = async function(...args) {
            if (originalAction) {
                return originalAction(newAction.$$bound.concat(args));
            } else {
                // In this case we're calling the user-defined action directly.
                return currentAction(...newAction.$$bound, ...args);
            }
        };
        for (const key of [
            "$$typeof",
            "$$id",
            "$$FORM_ACTION"
        ]){
            // @ts-ignore
            newAction[key] = currentAction[key];
        }
        // Rebind args
        newAction.$$bound = (currentAction.$$bound || []).concat(boundArgs);
        // Assign bind method
        newAction.bind = bindImpl.bind(newAction);
        return newAction;
    }
    Object.defineProperties(action, {
        $$typeof: {
            value: SERVER_REFERENCE_TAG
        },
        $$id: {
            value: id
        },
        $$bound: {
            value: boundArgsFromClosure
        },
        bind: {
            value: bindImpl
        }
    });
}

//# sourceMappingURL=action-proxy.js.map
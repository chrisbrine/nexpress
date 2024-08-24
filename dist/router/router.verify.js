"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleVerify = handleVerify;
const types_1 = require("@/types");
const nvalidators_1 = require("@strbjun/nvalidators");
const getValue = (req, type, param, id) => {
    switch (type) {
        case types_1.NExpressVerificationTypes.QUERY:
            return req.query[param];
        case types_1.NExpressVerificationTypes.BODY:
            return req.body[param];
        case types_1.NExpressVerificationTypes.PARAMS:
            return id;
        default:
            return null;
    }
};
const setValue = (type, param, newValue, options) => {
    var _a, _b, _c;
    switch (type) {
        case types_1.NExpressVerificationTypes.QUERY:
            if ((_a = options === null || options === void 0 ? void 0 : options.req) === null || _a === void 0 ? void 0 : _a.query) {
                options.req.query[param] = newValue;
            }
            break;
        case types_1.NExpressVerificationTypes.BODY:
            if ((_b = options === null || options === void 0 ? void 0 : options.req) === null || _b === void 0 ? void 0 : _b.body) {
                options.req.body[param] = newValue;
            }
            break;
        case types_1.NExpressVerificationTypes.PARAMS:
            if ((_c = options === null || options === void 0 ? void 0 : options.req) === null || _c === void 0 ? void 0 : _c.params) {
                options.req.params[param] = newValue;
            }
            break;
    }
};
const handle = (type, param, action, value, options) => {
    if (typeof action === "object") {
        return (0, nvalidators_1.stack)(value, action, {
            setter: (newValue) => setValue(type, param, newValue, options),
        });
    }
    else {
        return action(value, options);
    }
};
function handleVerifyItem(action, param, type) {
    return (req, res, next, id) => {
        const value = getValue(req, type, param, id);
        if (handle(type, param, action, value, {
            paramName: param,
            type,
            req,
            res,
            next,
        })) {
            next();
        }
        else {
            res.status(400).json({
                message: `Failed verification check`,
                error: {
                    param,
                    type,
                    value,
                },
            });
        }
    };
}
function handleVerify(verify, router, path) {
    Object.keys(verify).forEach((type) => {
        Object.keys(verify[type]).forEach((param) => {
            switch (type) {
                case types_1.NExpressVerificationTypes.QUERY:
                    router.use(path, handleVerifyItem(verify[type][param], param, type));
                    break;
                case types_1.NExpressVerificationTypes.BODY:
                    router.use(path, handleVerifyItem(verify[type][param], param, type));
                    break;
                case types_1.NExpressVerificationTypes.PARAMS:
                    router.param(param, handleVerifyItem(verify[type][param], param, type));
                    break;
            }
        });
    });
}

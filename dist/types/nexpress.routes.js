"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NExpressVerificationTypes = exports.RouterMethods = void 0;
var RouterMethods;
(function (RouterMethods) {
  RouterMethods["GET"] = "get";
  RouterMethods["POST"] = "post";
  RouterMethods["PUT"] = "put";
  RouterMethods["DELETE"] = "delete";
  RouterMethods["PATCH"] = "patch";
  RouterMethods["ALL"] = "all";
})(RouterMethods || (exports.RouterMethods = RouterMethods = {}));
var NExpressVerificationTypes;
(function (NExpressVerificationTypes) {
  NExpressVerificationTypes["QUERY"] = "query";
  NExpressVerificationTypes["BODY"] = "body";
  NExpressVerificationTypes["PARAMS"] = "params";
})(
  NExpressVerificationTypes ||
    (exports.NExpressVerificationTypes = NExpressVerificationTypes = {}),
);

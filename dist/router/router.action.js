"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NExpressRouterAction = void 0;
const types_1 = require("../types");
class NExpressRouterAction {
  constructor(label, router, options, method, path, fullPath) {
    this.paramDescriptors = {};
    this.label = label;
    this.router = router;
    this.path = path;
    this.fullPath = fullPath;
    this.method = method;
    this.action = options.action;
    this.title = options.title || "";
    this.description = options.description || "";
    this.category = options.category || "";
    this.paramDescriptors = options.params || {};
    switch (method) {
      case types_1.RouterMethods.GET:
        this.router.get(this.path, this.handleAction());
        break;
      case types_1.RouterMethods.POST:
        this.router.post(this.path, this.handleAction());
        break;
      case types_1.RouterMethods.PUT:
        this.router.put(this.path, this.handleAction());
        break;
      case types_1.RouterMethods.DELETE:
        this.router.delete(this.path, this.handleAction());
        break;
      case types_1.RouterMethods.PATCH:
        this.router.patch(this.path, this.handleAction());
        break;
      case types_1.RouterMethods.ALL:
        this.router.all(this.path, this.handleAction());
        break;
      default:
        this.router.get(this.path, this.handleAction());
        break;
    }
  }
  handleAction() {
    const Data = {
      label: this.label,
      title: this.title,
      description: this.description,
      category: this.category,
      path: this.path,
      fullPath: this.fullPath,
      method: this.method,
      params: this.paramDescriptors,
    };
    return (req, res, next) => {
      const getParams = (params) => {
        const result = {};
        Object.keys(params).forEach((param) => {
          result[param] = req.params[params[param]];
        });
      };
      const getQueries = (queries) => {
        const result = {};
        Object.keys(queries).forEach((query) => {
          result[query] = req.query[queries[query]] || "";
        });
      };
      const getBodyJsonEntries = (body) => {
        const result = {};
        Object.keys(body).forEach((entry) => {
          result[entry] = req.body[body[entry]] || "";
        });
      };
      const Utils = {
        send: (data, status = 200) => {
          res.send(data).status(status);
        },
        sendJson: (data, status = 200) => {
          res.json(data).status(status);
        },
        sendError: (message, error, status = 400) => {
          res.json({ message, error }).status(status);
        },
        params: getParams,
        queries: getQueries,
        bodyJsonEntries: getBodyJsonEntries,
      };
      this.action(Utils, Data, { req, res, next });
    };
  }
  info() {
    return {
      label: this.label,
      title: this.title,
      description: this.description,
      category: this.category,
      method: this.method,
      fullPath: this.fullPath,
      path: this.path,
      param: this.paramDescriptors,
    };
  }
  getMethod() {
    return this.method;
  }
}
exports.NExpressRouterAction = NExpressRouterAction;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NExpressRoute = void 0;
const express_1 = require("express");
const router_action_1 = require("./router.action");
const router_verify_1 = require("./router.verify");
class NExpressRoute {
    fixPath(subPath, path) {
        if (path.length <= 0) {
            return subPath;
        }
        else if (subPath.length <= 0) {
            return path;
        }
        else if (subPath.endsWith("/")) {
            if (path.startsWith("/")) {
                return subPath + path.substring(1);
            }
            else {
                return subPath + path;
            }
        }
        else {
            if (path.startsWith("/")) {
                return subPath + path;
            }
            else {
                return subPath + "/" + path;
            }
        }
    }
    constructor(label, options, subPath = "") {
        this.subRoutes = {};
        this.routerMethods = [];
        this.router = (0, express_1.Router)();
        this.label = label;
        this.path = options.path;
        this.methods = options.methods || {};
        this.subPath = subPath;
        this.fullPath = this.fixPath(this.subPath, options.path);
        this.middleware = options.middleware || [];
        this.subRoutesOptions = options.router || {};
        this.params = options.params || {};
        this.verify = options.verify || {};
        if (this.middleware.length > 0) {
            this.middleware.forEach((middleware) => {
                this.router.use(middleware);
            });
        }
        if (this.methods) {
            Object.keys(this.methods).forEach((method) => {
                const options = this.methods[method];
                const action = new router_action_1.NExpressRouterAction(this.label, this.router, options, method, this.path, this.fullPath);
                this.routerMethods.push(action);
            });
        }
        if (this.subRoutesOptions) {
            this.createRouters(this.subRoutesOptions);
        }
        if (this.params) {
            Object.keys(this.params).forEach((param) => {
                this.router.param(param, this.params[param]);
            });
        }
        if (this.verify) {
            (0, router_verify_1.handleVerify)(this.verify, this.router, this.path);
        }
    }
    info(routerInfo = {}) {
        this.routerMethods.forEach((method) => {
            const methodInfo = method.info();
            const methodType = methodInfo.method;
            const category = methodInfo.category || "0";
            const label = this.label || "0";
            if (!routerInfo[category]) {
                routerInfo[category] = {};
            }
            if (!routerInfo[category][label]) {
                routerInfo[category][label] = {};
            }
            routerInfo[category][label][methodType] = methodInfo;
        });
        Object.keys(this.subRoutes).forEach((route) => {
            this.subRoutes[route].info(routerInfo);
        });
    }
    createRouters(routes) {
        Object.keys(routes).forEach((route) => {
            if (routes && routes[route]) {
                const newRoute = new NExpressRoute(route, routes[route], this.fullPath);
                this.subRoutes[route] = newRoute;
                this.router.use(newRoute.getRouter());
            }
        });
    }
    AddRouter(routes, label) {
        if (label && label.length > 0) {
            const firstLabel = label.shift();
            if (firstLabel && this.subRoutes[firstLabel]) {
                this.subRoutes[firstLabel].AddRouter(routes, label);
            }
            else {
                console.error(`Router "${firstLabel}" does not exist`);
            }
        }
        else {
            this.createRouters(routes);
        }
    }
    getRouter() {
        return this.router;
    }
}
exports.NExpressRoute = NExpressRoute;

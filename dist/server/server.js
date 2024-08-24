"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NExpress = void 0;
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const router_1 = require("../router");
const types_1 = require("../types");
const utils_1 = require("../utils");
class NExpress {
    constructor(options) {
        this.routes = {};
        this.routerInfoCache = undefined;
        this.app = (0, express_1.default)();
        if (options.middleware) {
            options.middleware.forEach((middleware) => {
                this.app.use(middleware);
            });
        }
        if (options.options) {
            if (options.options.Router) {
                this.app.use(express_1.default.Router(options.options.Router));
            }
            if (options.options.json) {
                this.app.use(express_1.default.json(options.options.json));
            }
            if (options.options.urlencoded) {
                this.app.use(express_1.default.urlencoded(options.options.urlencoded));
            }
            if (options.staticRoot) {
                this.app.use(express_1.default.static(options.staticRoot, options.options.static || {}));
            }
        }
        if (options.routes) {
            this.createRouters(options.routes);
        }
        // start the server
        // if only a number set then just use that port, and find the protocol if http should start as an https server
        if (typeof options.Ports === "number") {
            this.startServer({ port: options.Ports });
        }
        else {
            options.Ports.forEach((port) => {
                this.startServer(port);
            });
        }
    }
    startServer(port) {
        const useHttps = port.protocol === types_1.NExpressPortTypes.HTTPS ? true : false;
        const httpsOptions = port.files || { key: "", cert: "" };
        if (useHttps) {
            if (httpsOptions.key === "" || httpsOptions.cert === "") {
                const errorMsg = `HTTPS key and cert files must be provided for port ${port.port}`;
                utils_1.log.error("errorMsg");
                throw new Error(errorMsg);
            }
            else {
                const certFiles = {
                    key: fs_1.default.readFileSync(httpsOptions.key),
                    cert: fs_1.default.readFileSync(httpsOptions.cert),
                };
                https_1.default.createServer(certFiles, this.app).listen(port.port, () => {
                    utils_1.log.info(`Server started on port ${port.port}`);
                });
            }
        }
        else {
            this.app.listen(port, () => {
                utils_1.log.info(`Server started on port ${port}`);
            });
        }
    }
    getApp() {
        return this.app;
    }
    info() {
        if (!this.routerInfoCache) {
            const routerInfo = {};
            Object.keys(this.routes).forEach((route) => {
                this.routes[route].info(routerInfo);
            });
            this.routerInfoCache = routerInfo;
        }
        return this.routerInfoCache;
    }
    createRouters(routes) {
        Object.keys(routes).forEach((route) => {
            if (routes && routes[route]) {
                const newRoute = new router_1.NExpressRoute(route, routes[route]);
                this.routes[route] = newRoute;
                this.app.use(newRoute.getRouter());
            }
        });
    }
    AddRouter(routes, label) {
        if (label && label.length > 0) {
            const firstLabel = label.shift();
            if (firstLabel && this.routes[firstLabel]) {
                this.routes[firstLabel].AddRouter(routes, label);
            }
            else {
                utils_1.log.error(`Router "${firstLabel}" does not exist`);
            }
        }
        else {
            this.createRouters(routes);
        }
        this.deleteRouterInfoCache();
    }
    deleteRouterInfoCache() {
        this.routerInfoCache = undefined;
    }
}
exports.NExpress = NExpress;

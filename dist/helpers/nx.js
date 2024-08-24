"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NX = void 0;
const server_1 = require("../server");
const types_1 = require("../types");
exports.NX = {
    Server: (Ports, middleware, staticRoot, options, routes) => new server_1.NExpress({
        Ports,
        middleware,
        staticRoot,
        options,
        routes,
    }),
    Port: (port, host, useHttps, keyFile, certFile) => ({
        port,
        host,
        files: useHttps
            ? { key: keyFile, cert: certFile }
            : undefined,
        protocol: useHttps ? types_1.NExpressPortTypes.HTTPS : types_1.NExpressPortTypes.HTTP,
    }),
    Route: (path, middleware, methods, router, params, verify) => ({
        path,
        middleware,
        methods,
        router,
        params,
        verify,
    }),
    Method: (action, title, description, category, params) => ({
        title,
        description,
        category,
        params,
        action,
    }),
};

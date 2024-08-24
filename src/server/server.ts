import express from "express";
import https from "https";
import fs from "fs";
import { NExpressRoute } from "../router";
import {
  NExpressHttpsOptions,
  NExpressOptions,
  NExpressPort,
  NExpressPortTypes,
  NExpressRouteList,
  NExpressRouteOptionsList,
  NExpressRouterInfo,
} from "../types";
import { log } from "../utils";

export class NExpress {
  private app: express.Application;
  private routes: NExpressRouteList = {};
  private routerInfoCache: NExpressRouterInfo | undefined = undefined;

  constructor(options: NExpressOptions) {
    this.app = express();
    if (options.middleware) {
      options.middleware.forEach((middleware) => {
        this.app.use(middleware);
      });
    }
    if (options.options) {
      if (options.options.json) {
        this.app.use(express.json(options.options.json));
      }
      if (options.options.urlencoded) {
        this.app.use(express.urlencoded(options.options.urlencoded));
      }
      if (options.staticRoot) {
        this.app.use(
          express.static(options.staticRoot, options.options.static || {}),
        );
      }
    }
    if (options.routes) {
      this.createRouters(options.routes);
    }

    // start the server
    // if only a number set then just use that port, and find the protocol if http should start as an https server
    if (typeof options.Ports === "number") {
      this.startServer({ port: options.Ports });
    } else {
      options.Ports.forEach((port) => {
        this.startServer(port);
      });
    }
  }

  private getHostString(port: NExpressPort) {
    const host = port.host ? port.host : "";
    if (host) {
      const protocol =
        port.protocol === NExpressPortTypes.HTTPS ? "https" : "http";
      return `${protocol}://${host}:${port.port}`;
    } else {
      return `port ${port.port}`;
    }
  }

  private startServer(port: NExpressPort) {
    const useHttps = port.protocol === NExpressPortTypes.HTTPS ? true : false;
    const httpsOptions =
      port.files || ({ key: "", cert: "" } as NExpressHttpsOptions);
    if (useHttps) {
      if (httpsOptions.key === "" || httpsOptions.cert === "") {
        const errorMsg = `HTTPS key and cert files must be provided for ${this.getHostString(port)}`;
        log.error("errorMsg");
        throw new Error(errorMsg);
      } else {
        const certFiles = {
          key: fs.readFileSync(httpsOptions.key),
          cert: fs.readFileSync(httpsOptions.cert),
        };
        https.createServer(certFiles, this.app).listen(port.port, () => {
          log.info(`Server started on ${this.getHostString(port)}`);
        });
      }
    } else {
      this.app.listen(port, () => {
        log.info(`Server started on ${this.getHostString(port)}`);
      });
    }
  }

  public getApp() {
    return this.app;
  }

  public info() {
    if (!this.routerInfoCache) {
      const routerInfo = {};
      Object.keys(this.routes).forEach((route) => {
        this.routes[route].info(routerInfo);
      });
      this.routerInfoCache = routerInfo;
    }
    return this.routerInfoCache;
  }

  private createRouters(routes: NExpressRouteOptionsList) {
    Object.keys(routes).forEach((route) => {
      if (routes && routes[route]) {
        const newRoute = new NExpressRoute(route, routes[route]);
        this.routes[route] = newRoute;
        this.app.use(newRoute.getRouter());
      }
    });
  }

  public AddRouter(routes: NExpressRouteOptionsList, label?: string[]) {
    if (label && label.length > 0) {
      const firstLabel = label.shift();
      if (firstLabel && this.routes[firstLabel]) {
        this.routes[firstLabel].AddRouter(routes, label);
      } else {
        log.error(`Router "${firstLabel}" does not exist`);
      }
    } else {
      this.createRouters(routes);
    }
    this.deleteRouterInfoCache();
  }

  public deleteRouterInfoCache() {
    this.routerInfoCache = undefined;
  }
}

import { Router } from "express";
import {
  middlewareFunction,
  NExpressParamsOptions,
  NExpressRouteActionOptions,
  NExpressRouteList,
  NExpressRouteOptions,
  NExpressRouteOptionsList,
  NExpressVerificationOptions,
  RouterMethods,
} from "@/types";
import { NExpressRouterAction } from "@/router/router.action";
import { handleVerify } from "@/router/router.verify";
import { NExpressRouterInfo } from "@/types/nexpress.routes.info";

export class NExpressRoute {
  private router: Router;
  private label: string;
  private path: string;
  private subPath: string;
  private fullPath: string;
  private middleware: middlewareFunction[];
  private methods: NExpressRouteActionOptions;
  private subRoutesOptions: NExpressRouteOptionsList;
  private subRoutes: NExpressRouteList = {};
  private params: NExpressParamsOptions;
  private verify: NExpressVerificationOptions;
  private routerMethods: NExpressRouterAction[] = [];

  private fixPath(subPath: string, path: string): string {
    if (path.length <= 0) {
      return subPath;
    } else if (subPath.length <= 0) {
      return path;
    } else if (subPath.endsWith("/")) {
      if (path.startsWith("/")) {
        return subPath + path.substring(1);
      } else {
        return subPath + path;
      }
    } else {
      if (path.startsWith("/")) {
        return subPath + path;
      } else {
        return subPath + "/" + path;
      }
    }
  }

  constructor(label: string, options: NExpressRouteOptions, subPath = "") {
    this.router = Router();
    this.label = label;
    this.path = options.path;
    this.methods = options.methods || ({} as NExpressRouteActionOptions);
    this.subPath = subPath;
    this.fullPath = this.fixPath(this.subPath, options.path);
    this.middleware = options.middleware || [];
    this.subRoutesOptions = options.router || ({} as NExpressRouteOptionsList);
    this.params = options.params || {};
    this.verify = options.verify || ({} as NExpressVerificationOptions);

    if (this.middleware.length > 0) {
      this.middleware.forEach((middleware) => {
        this.router.use(middleware);
      });
    }

    if (this.methods) {
      Object.keys(this.methods).forEach((method) => {
        const options = this.methods[method as RouterMethods];
        const action = new NExpressRouterAction(
          this.label,
          this.router,
          options,
          method as RouterMethods,
          this.path,
          this.fullPath,
        );
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
      handleVerify(this.verify, this.router, this.path);
    }
  }

  public info(routerInfo: NExpressRouterInfo = {}) {
    this.routerMethods.forEach((method) => {
      const methodInfo = method.info();
      const methodType = methodInfo.method;
      const category: string = methodInfo.category || "0";
      const label: string = this.label || "0";

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

  private createRouters(routes: NExpressRouteOptionsList) {
    Object.keys(routes).forEach((route) => {
      if (routes && routes[route]) {
        const newRoute = new NExpressRoute(route, routes[route], this.fullPath);
        this.subRoutes[route] = newRoute;
        this.router.use(newRoute.getRouter());
      }
    });
  }

  public AddRouter(routes: NExpressRouteOptionsList, label?: string[]) {
    if (label && label.length > 0) {
      const firstLabel = label.shift();
      if (firstLabel && this.subRoutes[firstLabel]) {
        this.subRoutes[firstLabel].AddRouter(routes, label);
      } else {
        console.error(`Router "${firstLabel}" does not exist`);
      }
    } else {
      this.createRouters(routes);
    }
  }

  public getRouter() {
    return this.router;
  }
}

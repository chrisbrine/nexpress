import { Router } from "express";
import {
  NExpressRouteOptions,
  NExpressRouteOptionsList,
  NExpressRouterInfo,
} from "../types";
export declare class NExpressRoute {
  private router;
  private label;
  private options;
  private path;
  private subPath;
  private fullPath;
  private middleware;
  private methods;
  private subRoutesOptions;
  private subRoutes;
  private params;
  private verify;
  private routerMethods;
  private fixPath;
  constructor(label: string, options: NExpressRouteOptions, subPath?: string);
  info(routerInfo?: NExpressRouterInfo): void;
  private createRouters;
  AddRouter(routes: NExpressRouteOptionsList, label?: string[]): void;
  getRouter(): Router;
}

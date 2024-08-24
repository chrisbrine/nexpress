import express from "express";
import {
  NExpressOptions,
  NExpressRouteOptionsList,
  NExpressRouterInfo,
} from "../types";
export declare class NExpress {
  private app;
  private routes;
  private routerInfoCache;
  constructor(options: NExpressOptions);
  private getHostString;
  private startServer;
  getApp(): express.Application;
  info(): NExpressRouterInfo;
  private createRouters;
  AddRouter(routes: NExpressRouteOptionsList, label?: string[]): void;
  deleteRouterInfoCache(): void;
}

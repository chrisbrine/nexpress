import { NextFunction, Request, Response, Router } from "express";
import {
  NExpressRouteActionSubOptions,
  RouterMethods,
  NEexpressRouterActionInfoResult,
} from "../types";
export declare class NExpressRouterAction {
  private label;
  private router;
  private title;
  private description;
  private category;
  private path;
  private fullPath;
  private paramDescriptors;
  private method;
  private action;
  constructor(
    label: string,
    router: Router,
    options: NExpressRouteActionSubOptions,
    method: RouterMethods,
    path: string,
    fullPath: string,
  );
  handleAction(): (req: Request, res: Response, next?: NextFunction) => void;
  info(): NEexpressRouterActionInfoResult;
  getMethod(): string;
}

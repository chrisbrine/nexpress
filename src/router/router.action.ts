import { NextFunction, Request, Response, Router } from "express";
import {
  NExpressRouteActionSubOptions,
  routerFunction,
  RouterMethods,
} from "@/types";
import { NEexpressRouterActionInfoResult } from "@/types/nexpress.routes.info";

export class NExpressRouterAction {
  private label: string;
  private router: Router;
  private title: string;
  private description: string;
  private category: string;
  private path: string;
  private fullPath: string;
  private paramDescriptors: Record<string, string> = {};
  private method: string;
  private action: routerFunction;

  constructor(
    label: string,
    router: Router,
    options: NExpressRouteActionSubOptions,
    method: RouterMethods,
    path: string,
    fullPath: string,
  ) {
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
      case RouterMethods.GET:
        this.router.get(this.path, this.handleAction());
        break;
      case RouterMethods.POST:
        this.router.post(this.path, this.handleAction());
        break;
      case RouterMethods.PUT:
        this.router.put(this.path, this.handleAction());
        break;
      case RouterMethods.DELETE:
        this.router.delete(this.path, this.handleAction());
        break;
      case RouterMethods.PATCH:
        this.router.patch(this.path, this.handleAction());
        break;
      case RouterMethods.ALL:
        this.router.all(this.path, this.handleAction());
        break;
      default:
        this.router.get(this.path, this.handleAction());
        break;
    }
  }

  public handleAction() {
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
    return (req: Request, res: Response, next?: NextFunction) => {
      const getParams = (params: Record<string, string>) => {
        const result: Record<string, string> = {};
        Object.keys(params).forEach((param) => {
          result[param] = req.params[params[param]];
        });
      };
      const getQueries = (queries: Record<string, string>) => {
        const result: Record<string, string> = {};
        Object.keys(queries).forEach((query) => {
          result[query] =
            (req.query[queries[query]] as string | undefined) || "";
        });
      };
      const getBodyJsonEntries = (body: Record<string, string>) => {
        const result: Record<string, string> = {};
        Object.keys(body).forEach((entry) => {
          result[entry] = (req.body[body[entry]] as string | undefined) || "";
        });
      };
      const Utils = {
        send: (data: string, status = 200) => {
          res.send(data).status(status);
        },
        sendJson: (data: unknown, status = 200) => {
          res.json(data).status(status);
        },
        sendError: (message: string, error?: Error | undefined, status = 400) => {
          res.json({ message, error }).status(status);
        },
        params: getParams,
        queries: getQueries,
        bodyJsonEntries: getBodyJsonEntries,
      };
      this.action(Utils, Data, { req, res, next });
    };
  }

  public info(): NEexpressRouterActionInfoResult {
    return {
      label: this.label,
      title: this.title,
      description: this.description,
      category: this.category,
      method: this.method as RouterMethods,
      fullPath: this.fullPath,
      path: this.path,
      param: this.paramDescriptors,
    };
  }

  public getMethod(): string {
    return this.method;
  }
}

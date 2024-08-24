import { NextFunction, Request, Response } from "express";
import { NExpressRouteOptionsList } from "./nexpress.routes";

export enum NExpressPortTypes {
  HTTP = "http",
  HTTPS = "https",
}

export interface NExpressPort {
  protocol?: NExpressPortTypes;
  port: number;
  files?: NExpressHttpsOptions;
}

export type middlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export interface RouterOptions {
  caseSensitive?: boolean;
  mergeParams?: boolean;
  strict?: boolean;
}

export interface JsonOptions {
  inflate?: boolean;
  limit?: number | string;
  reviver?: (key: string, value: unknown) => unknown;
  strict?: boolean;
  type?: string | string[] | ((req: unknown) => unknown);
  verify?: (req: unknown, res: unknown, buf: Buffer, encoding: string) => void;
}

export interface UrlEncodedOptions {
  extended?: boolean;
  inflate?: boolean;
  limit?: number | string;
  parameterLimit?: number;
  type?: string | string[] | ((req: unknown) => unknown);
  verify?: (req: unknown, res: unknown, buf: Buffer, encoding: string) => void;
}

export interface StaticOptions {
  dotfiles?: string;
  etag?: boolean;
  extensions?: string[] | false;
  fallthrough?: boolean;
  immutable?: boolean;
  index?: boolean | string | string[];
  lastModified?: boolean;
  maxAge?: number | string;
  redirect?: boolean;
  setHeaders?: (res: Response, path: string, stat: unknown) => void;
}

export interface NExpressHttpsOptions {
  key: string;
  cert: string;
}

export interface NExpressOptions {
  Ports: NExpressPort[] | number;
  middleware?: middlewareFunction[];
  staticRoot?: string;
  options?: {
    Router?: RouterOptions;
    json?: JsonOptions;
    urlencoded?: UrlEncodedOptions;
    static?: StaticOptions;
  };
  routes?: NExpressRouteOptionsList;
}

import { NextFunction, Request, Response } from "express";
import { middlewareFunction } from "./nexpress";
import { NExpressRoute } from "../router";
import { StackProcessor } from "@strbjun/nvalidators";

export enum RouterMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
  ALL = "all",
}

export interface routerFunctionInputs {
  req: Request;
  res: Response;
  next?: NextFunction;
}
export type routerFunction = (
  Utils: Record<string, unknown>,
  Data: Record<string, unknown>,
  exp: routerFunctionInputs,
) => void;

export type paramFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
  id: unknown,
) => void;

export type NExpressParamsOptions = Record<string, paramFunction>;

export enum NExpressVerificationTypes {
  QUERY = "query",
  BODY = "body",
  PARAMS = "params",
}

export interface verificationFunctionOptions {
  paramName?: string;
  type?: NExpressVerificationTypes;
  req?: Request;
  res?: Response;
  next?: NextFunction;
}

export type verificationFunction = (
  item: unknown,
  options?: verificationFunctionOptions,
) => boolean;

export type NExpressVerificationOptions = {
  [verificationType in NExpressVerificationTypes]: Record<
    string,
    verificationFunction | StackProcessor
  >;
};

export type NExpressRouteParamDescriptor = Record<string, string>;

export interface NExpressRouteActionSubOptions {
  title?: string;
  description?: string;
  category?: string;
  params?: NExpressRouteParamDescriptor;
  action: routerFunction;
}

export type NExpressRouteActionOptions = Record<
  RouterMethods,
  NExpressRouteActionSubOptions
>;

export interface RouterOptions {
  caseSensitive?: boolean;
  mergeParams?: boolean;
  strict?: boolean;
}

export interface NExpressRouteOptions {
  path: string;
  middleware?: middlewareFunction[];
  methods?: NExpressRouteActionOptions;
  router?: NExpressRouteOptionsList;
  params?: NExpressParamsOptions;
  verify?: NExpressVerificationOptions;
  options?: RouterOptions;
}

export type NExpressRouteOptionsList = Record<string, NExpressRouteOptions>;

export type NExpressRouteList = Record<string, NExpressRoute>;

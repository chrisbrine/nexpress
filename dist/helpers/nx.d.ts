import { RouterOptions } from "express";
import { NExpress } from "../server";
import {
  JsonOptions,
  middlewareFunction,
  NExpressParamsOptions,
  NExpressPort,
  NExpressRouteActionOptions,
  NExpressRouteActionSubOptions,
  NExpressRouteOptions,
  NExpressRouteOptionsList,
  NExpressRouteParamDescriptor,
  NExpressVerificationOptions,
  routerFunction,
  RouterMethods,
  StaticOptions,
  UrlEncodedOptions,
} from "../types";
export declare const NX: {
  Server: (
    Ports: NExpressPort[] | number,
    middleware?: middlewareFunction[] | undefined,
    staticRoot?: string | undefined,
    options?:
      | {
          Router?: RouterOptions;
          json?: JsonOptions;
          urlencoded?: UrlEncodedOptions;
          static?: StaticOptions;
        }
      | undefined,
    routes?: NExpressRouteOptionsList | undefined,
  ) => NExpress;
  Port: (
    port: number,
    host?: string | undefined,
    useHttps?: boolean | undefined,
    keyFile?: string | undefined,
    certFile?: string | undefined,
  ) => NExpressPort;
  Route: (
    path: string,
    middleware?: middlewareFunction[] | undefined,
    methods?: NExpressRouteActionOptions | undefined,
    router?: NExpressRouteOptionsList | undefined,
    params?: NExpressParamsOptions | undefined,
    verify?: NExpressVerificationOptions | undefined,
  ) => NExpressRouteOptions;
  Method: (
    action: routerFunction,
    title?: string | undefined,
    description?: string | undefined,
    category?: string | undefined,
    params?: NExpressRouteParamDescriptor | undefined,
  ) => NExpressRouteActionSubOptions;
  Methods: (
    ...args: [RouterMethods, NExpressRouteActionSubOptions][]
  ) => NExpressRouteActionOptions;
};

import { RouterOptions } from "express";
import { NExpress } from "../server";
import {
  JsonOptions,
  middlewareFunction,
  NExpressHttpsOptions,
  NExpressParamsOptions,
  NExpressPort,
  NExpressPortTypes,
  NExpressRouteActionOptions,
  NExpressRouteActionSubOptions,
  NExpressRouteOptions,
  NExpressRouteOptionsList,
  NExpressRouteParamDescriptor,
  NExpressVerificationOptions,
  routerFunction,
  StaticOptions,
  UrlEncodedOptions,
} from "../types";

export const NX = {
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
  ): NExpress =>
    new NExpress({
      Ports,
      middleware,
      staticRoot,
      options,
      routes,
    }),
  Port: (
    port: number,
    host?: string | undefined,
    useHttps?: boolean | undefined,
    keyFile?: string | undefined,
    certFile?: string | undefined,
  ): NExpressPort =>
    ({
      port,
      host,
      files: useHttps
        ? ({ key: keyFile, cert: certFile } as NExpressHttpsOptions)
        : undefined,
      protocol: useHttps ? NExpressPortTypes.HTTPS : NExpressPortTypes.HTTP,
    }) as NExpressPort,
  Route: (
    path: string,
    middleware?: middlewareFunction[] | undefined,
    methods?: NExpressRouteActionOptions | undefined,
    router?: NExpressRouteOptionsList | undefined,
    params?: NExpressParamsOptions | undefined,
    verify?: NExpressVerificationOptions | undefined,
  ): NExpressRouteOptions =>
    ({
      path,
      middleware,
      methods,
      router,
      params,
      verify,
    }) as NExpressRouteOptions,
  Method: (
    action: routerFunction,
    title?: string | undefined,
    description?: string | undefined,
    category?: string | undefined,
    params?: NExpressRouteParamDescriptor | undefined,
  ) =>
    ({
      title,
      description,
      category,
      params,
      action,
    }) as NExpressRouteActionSubOptions,
};

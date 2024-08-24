import { NExpressRouteParamDescriptor, RouterMethods } from "./nexpress.routes";
export interface NExpressRouterInfoResult {
  methods: NEexpressRouterActionInfoResult;
}
export interface NEexpressRouterActionInfoResult
  extends NExpressRouterInfoMethod {
  label: string;
  category: string;
  title: string;
  method: RouterMethods;
}
export interface NExpressRouterInfoMethod {
  title: string;
  description: string;
  path: string;
  fullPath: string;
  param: NExpressRouteParamDescriptor;
}
export type NExpressRouterInfoLabel = Record<string, NExpressRouterInfoMethod>;
export type NExpressRouterInfoCategory = Record<
  string,
  NExpressRouterInfoLabel
>;
export type NExpressRouterInfo = Record<string, NExpressRouterInfoCategory>;

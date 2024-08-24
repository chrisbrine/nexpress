import express from "express";
import { NExpressOptions, NExpressRouteOptionsList } from "@/types";
import { NExpressRouterInfo } from "@/types/nexpress.routes.info";
export declare class NExpress {
    private app;
    private routes;
    private routerInfoCache;
    constructor(options: NExpressOptions);
    private startServer;
    getApp(): express.Application;
    info(): NExpressRouterInfo;
    private createRouters;
    AddRouter(routes: NExpressRouteOptionsList, label?: string[]): void;
    deleteRouterInfoCache(): void;
}

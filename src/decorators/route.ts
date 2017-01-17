import "reflect-metadata";

import { Request, Response } from 'express';

export type Method = 'head' | 'get' | 'post' | 'put' | 'patch' | 'delete' | 'any';

export interface RouteConfig {
    method: string,
    path: string,
    handler(req: Request, res: Response): void
}

export function Head(path: string): PropertyDecorator{
    return Route(path, 'head');
}

export function Get(path: string): PropertyDecorator{
    return Route(path, 'get');
}

export function Post(path: string): PropertyDecorator{
    return Route(path, 'post');
}

export function Put(path: string): PropertyDecorator{
    return Route(path, 'put');
}

export function Patch(path: string): PropertyDecorator{
    return Route(path, 'patch');
}

export function Delete(path: string): PropertyDecorator{
    return Route(path, 'delete');
}

export function Any(path: string): PropertyDecorator{
    return Route(path, 'any');
}

export function Route(path: string, method: Method): PropertyDecorator{

    return function(target: Function, key: string){

        let route: RouteConfig = {
            method: method,
            path: path,
            handler: target[key]
        };

        if(Reflect.hasMetadata('routes', target.constructor)){
            let list = Reflect.getMetadata('routes', target.constructor);

            list.push(route);
        } else {
            let routeList: RouteConfig[] = [route];

            Reflect.defineMetadata('routes', routeList, target.constructor);
        }
    }
}

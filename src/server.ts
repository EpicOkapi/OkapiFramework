import { Application } from 'express';
import { Container } from 'inversify';
import { ConnectionConfig } from 'knex';

import { RouteConfig } from './decorators/route';
import { ControllerConfig } from './decorators/controller';
import { ServerConfig } from './serverconfig';
import { DatabaseManager } from './database/dbmanager';

import * as express from 'express';

export class Server {
    private app: Application;
    private container: Container;
    private routes: Map<string, RouteConfig[]>;

    constructor(){
        this.app = express();
        this.container = new Container();
        this.routes = new Map();
    }

    registerRepository(repository: any){
        this.container.bind(repository.name).to(repository);
    }

    registerService(service: any){
        this.container.bind(service.name).to(service);
    }

    registerController(controller: any){
        //Get the route and controller configuration through reflection
        let routes: RouteConfig[] = Reflect.getMetadata('routes', controller);
        let controllerConfig: ControllerConfig = Reflect.getMetadata('config', controller);

        //Register the controller for DI
        this.container.bind(controller.name).to(controller);

        //Store routes for later use
        routes.forEach((route: RouteConfig) => {
            route.path = controllerConfig.path + route.path;
        });

        this.routes.set(controller.name, routes);
    }

    private registerRoutes(){

        this.routes.forEach((routes: RouteConfig[], controller: string) => {

            //Create an instance of the controller to bind to the handlers
            let controllerInstance = this.container.get(controller);

            //Register all the routes to express
            routes.forEach((route: RouteConfig) => {
                console.log(`Registering route "${route.path}" [${route.method}]`);

                this.app[route.method](route.path, route.handler.bind(controllerInstance));
            });
        });
    }

    letsGo(config: ServerConfig){
        this.container.bind('ServerConfig').toConstantValue(config);
        this.container.bind('DatabaseManager').to(DatabaseManager).inSingletonScope();

        this.registerRoutes();

        this.app.listen(config.port, function () {
          console.log(`Example app listening on port ${config.port}!`);
        });
    }
}

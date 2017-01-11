import { Route, RouteConfig } from './decorators/route';
import { Controller, ControllerConfig, IController } from './decorators/controller';
import { Server, ServerConfig } from './server';

import * as express from "express";

import "reflect-metadata";

@Controller('/resource')
class TestController implements IController {

    @Route('/endpoint', 'get')
    private test(req: express.Request, res: express.Response){
        res.send('hi!');
    }
}

let test: TestController = new TestController();

let config: ServerConfig = {
    port: 3000
};

let server: Server = new Server();

server.registerController(controller);

server.start();

var routes: RouteConfig[] = Reflect.getMetadata('routes', TestController);
var controllerConfig: ControllerConfig = Reflect.getMetadata('config', TestController);

var app = express()

routes.forEach((route: RouteConfig) => {
    var fullPath = controllerConfig.path + route.path;

    console.log(`Registering route "${fullPath}" [${route.method}]`);

    app[route.method](fullPath, route.handler);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

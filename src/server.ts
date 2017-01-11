import { Application } from 'express';
import { Container } from 'inversify';

import { IController } from './decorators/controller';

import * as express from 'express';

export class Server {
    private app: Application;
    private container: Container;

    constructor(){
        this.app = express();
        this.container = new Container();
    }

    registerController(controller: IController){

    }

    start(config: ServerConfig){

        this.app.listen(config.port, function () {
          console.log(`Example app listening on port ${config.port}!`);
        });
    }
}

export interface ServerConfig {
    port: number
}

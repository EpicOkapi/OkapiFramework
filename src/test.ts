import { Route, RouteConfig } from './decorators/route';
import { Controller, ControllerConfig } from './decorators/controller';
import { Service } from './decorators/service';
import { Server } from './server';
import { Repository } from './database/repository';
import { Entity } from './database/entity';
import { ServerConfig } from './serverconfig';

import { injectable, inject } from 'inversify';
import { Config } from 'knex';

import * as express from "express";
import config from './config';

import "reflect-metadata";

interface Test extends Entity {
    content: string;
}

class TestRepository extends Repository<Test> {

    constructor(@inject('DatabaseManager') databaseManager){
        super(databaseManager);

        this.tableName = 'test';
    }
}

/*
 * Create a service to test mah shiet
 */

@Service()
class TestService {
    private testNumber: number = 0;

    constructor(@inject('TestRepository') private testRepository){

    }

    sayHi(){
        return "hi there!!" + this.testNumber++;
    }

    getFromRepo(){
        return this.testRepository.findById(1, ['content']);
    }
}

/*
 * Create a controller to test mah shiet
 */

@Controller('/resource')
class TestController {

    constructor(@inject('TestService') private testService: TestService){

    }

    @Route('/endpoint', 'get')
    private test(req: express.Request, res: express.Response){
        res.send(this.testService.sayHi());
    }

    @Route('/test', 'get')
    private tralala(req: express.Request, res: express.Response){
        this.testService.getFromRepo().then(function(result: Test){
            res.json(result);
        });
    }
}


@Controller('/resourcee')
class AnotherController {

    constructor(@inject('TestService') private testService: TestService){

    }

    @Route('/endpoint', 'get')
    private test(req: express.Request, res: express.Response){
        res.send(this.testService.sayHi());
    }
}

/*
 * Register controllers and services
 */

const server: Server = new Server();

server.registerRepository(TestRepository);
server.registerService(TestService);
server.registerController(TestController);
server.registerController(AnotherController);

//Boot it up
server.letsGo(config);

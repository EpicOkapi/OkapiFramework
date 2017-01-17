import "reflect-metadata";

import { injectable } from 'inversify';

export interface ControllerConfig {
    path: string
}

export function Controller(path: string): ClassDecorator {

    return function(target: Function){

        var config: ControllerConfig = {
            path: path
        };

        Reflect.defineMetadata('config', config, target);

        return injectable()(target);
    }
}

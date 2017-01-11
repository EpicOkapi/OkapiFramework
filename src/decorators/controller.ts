import "reflect-metadata";

export interface ControllerConfig {
    path: string
}

export interface IController {
    
}

export function Controller(path: string): ClassDecorator {

    return function(target: Function){

        var config: ControllerConfig = {
            path: path
        };

        return Reflect.defineMetadata('config', config, target);
    }
}

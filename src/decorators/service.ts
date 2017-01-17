import { injectable } from 'inversify';

export function Service(){

    return function(target: Function){
        return injectable()(target);
    }
}

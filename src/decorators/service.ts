import { injectable } from 'inversify';

export function Service(){

    return function(target){
        return injectable()(target);
    }
}

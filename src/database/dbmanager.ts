import * as client from 'knex';
import { inject, injectable } from 'inversify';

import { ServerConfig } from '../serverconfig';

@injectable()
export class DatabaseManager {

    private connection: client;

    constructor(@inject('ServerConfig') serverConfig: ServerConfig){
        this.connection = client(serverConfig.database);
    }

    public getConnection(){
        return this.connection;
    }
}

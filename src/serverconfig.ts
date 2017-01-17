import { Config } from 'knex';

export interface ServerConfig {
    port: number,
    database: Config
}

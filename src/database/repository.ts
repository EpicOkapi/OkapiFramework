import { Entity } from './entity';
import { DatabaseManager } from './dbmanager';

import { injectable, inject } from 'inversify';

import * as client from 'knex';

export interface IRepository<T extends Entity> {
    findById(id: number, fields?: string[]): Promise<T>;
    findAll(fields?: string[]): Promise<T[]>;
    create(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    delete(id: number): Promise<boolean>;
}

@injectable()
export abstract class Repository<T extends Entity> implements IRepository<Entity> {

    protected tableName: string;
    protected connection: client;

    protected constructor(@inject('DatabaseManager') databaseManager: DatabaseManager){
        this.connection = databaseManager.getConnection();
    }

    public findById(id: number, fields?: string[]): Promise<T>{
        var query = fields ? this.connection.select(...fields) : this.connection.select();

        return query
            .from(this.tableName)
            .where('id', id )
            .first();
    }

    public findAll(fields?: string[]): Promise<T[]>{
        var query = fields ? this.connection.select(...fields) : this.connection.select();

        return query
            .from(this.tableName);
    }

    public create(entity: T): Promise<T> {
        return this.connection(this.tableName)
            .insert(entity);
    }

    public update(entity: T): Promise<T> {
        return this.connection(this.tableName)
            .where('id', entity.id)
            .update(entity);
    }

    public delete(id: number): Promise<boolean> {
        return this.connection(this.tableName)
            .where('id', id)
            .del();
    }
}

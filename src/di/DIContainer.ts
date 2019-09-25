import { ContainerBuilder, Reference } from 'node-dependency-injection';

import { BunyanLoggerService } from "../service/BunyanLoggerService";

import { MysqlConnector } from '../repository/mysql/MysqlConnector';
import { MongodbConnector } from './../repository/mongodb/MongodbConnector';
import { MongooseConnector } from './../repository/mongoose/MongooseConnector';

import { MysqlUserRepository } from '../repository/mysql/MysqlUserRepository';
import { MongodbUserRepository } from '../repository/mongodb/MongodbUserRepository';
import { MongooseUserRepository } from './../repository/mongoose/MongooseUserRepository';

import { UserService } from "../service/UserService";

import { ErrorHandler } from '../controller/error/ErrorHandler';

export class DIContainer {

    private _container = new ContainerBuilder();

    createRegister() {

        //
        // Utils
        this._container.register("bunyanLoggerService", BunyanLoggerService);

        //
        // Repositories
        this._container.register("mysqlConnector", MysqlConnector);
        this._container.register("mysqlUserRepository", MysqlUserRepository)
            .addArgument(new Reference("mysqlConnector"));

        this._container.register("mongodbConnector", MongodbConnector);
        this._container.register("mongodbUserRepository", MongodbUserRepository)
            .addArgument(new Reference("mongodbConnector"));
            
        this._container.register("mongooseConnector", MongooseConnector);
        this._container.register("mongooseUserRepository", MongooseUserRepository)
            .addArgument(new Reference("mongooseConnector"));

        //
        // Common Services

        //
        // Services
        this._container.register("userService", UserService)
            .addArgument(new Reference("mysqlUserRepository"))
            .addArgument(new Reference("mongodbUserRepository"))
            .addArgument(new Reference("mongooseUserRepository"));

        //
        // Error handler
        this._container.register("errorHandler", ErrorHandler)
            .addArgument(new Reference("kafkaProducerService"));

        return this._container;
    }
}

import { ContainerBuilder, Reference } from 'node-dependency-injection';

import { BunyanLoggerService } from "../service/BunyanLoggerService";

import { MysqlConnector } from '../repository/mysql/MysqlConnector';
import { MongodbConnector } from './../repository/mongodb/MongodbConnector';

import { MysqlUserRepository } from '../repository/mysql/MysqlUserRepository';
import { UserRepository } from '../repository/mongodb/UserRepository';

import { UserService } from "../service/UserService";

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
        this._container.register("userRepository", UserRepository)
            .addArgument(new Reference("mongodbConnector"));

        //
        // Common Services

        //
        // Services
        this._container.register("userService", UserService)
            .addArgument(new Reference("mysqlUserRepository"))
            .addArgument(new Reference("userRepository"));

        return this._container;
    }
}

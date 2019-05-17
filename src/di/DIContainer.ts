import { ContainerBuilder, Reference } from 'node-dependency-injection';

import { MongodbConnector } from './../repository/mongodb/MongodbConnector';

import { BunyanLoggerService } from "../service/BunyanLoggerService";

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
        this._container.register("mongodbConnector", MongodbConnector);
        this._container.register("userRepository", UserRepository)
            .addArgument(new Reference("mongodbConnector"));

        //
        // Common Services

        //
        // Services
        this._container.register("userService", UserService)
            .addArgument(new Reference("userRepository"));

        return this._container;
    }
}

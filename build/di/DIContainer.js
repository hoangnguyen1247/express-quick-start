"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_dependency_injection_1 = require("node-dependency-injection");
var MongodbConnector_1 = require("./../repository/mongodb/MongodbConnector");
var BunyanLoggerService_1 = require("../service/BunyanLoggerService");
var UserRepository_1 = require("../repository/mongodb/UserRepository");
var UserService_1 = require("../service/UserService");
var DIContainer = /** @class */ (function () {
    function DIContainer() {
        this._container = new node_dependency_injection_1.ContainerBuilder();
    }
    DIContainer.prototype.createRegister = function () {
        //
        // Utils
        this._container.register("bunyanLoggerService", BunyanLoggerService_1.BunyanLoggerService);
        //
        // Repositories
        this._container.register("mongodbConnector", MongodbConnector_1.MongodbConnector);
        this._container.register("userRepository", UserRepository_1.UserRepository)
            .addArgument(new node_dependency_injection_1.Reference("mongodbConnector"));
        //
        // Common Services
        //
        // Services
        this._container.register("userService", UserService_1.UserService)
            .addArgument(new node_dependency_injection_1.Reference("userRepository"));
        return this._container;
    };
    return DIContainer;
}());
exports.DIContainer = DIContainer;
//# sourceMappingURL=DIContainer.js.map
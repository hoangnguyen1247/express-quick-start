import * as ormconfig from "../ormconfig";
import * as packageJson from "../../package.json";

export const configCommon = {
    version: {
        shortVersion: packageJson.version,
        fullVersion: packageJson.version + "." + "7e6cc45", // git rev-parse --short HEAD
    },
    server: {
        port: 5201,
    },
    corsOptions: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        exposedHeaders: "Authorization",
        credentials: true,
        optionsSuccessStatus: 200,
    },
    swaggerConfig: {
        swaggerDefinition: {
            info: {
                title: 'RESTful API',
                version: '1.0.0',
                description: 'RESTful API description',
            },
            host: 'api.yourserver.com',
            basePath: '/',
            securityDefinitions: {
                Bearer: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                }
            }
        },
        apis: ['./src/controller/*.ts'],
    },
    httpAuth: {
        username: "express",
        password: "express123",
    },
    database: {
        mysql: {
            enabled: true,
            config: {
                "name": "mysql-express",
                "type": "mysql",
                "host": "localhost",
                "port": 3306,
                "username": "express",
                "password": "express",
                "database": "express",
                "synchronize": true,
                "logging": false,
                "entities": [
                    process.cwd() + "/src/entity/mysql/*.ts",
                ],
            },
        },
        mongodb: {
            enabled: true,
            config: {
                "name": "mongodb-express",
                "type": "mongodb",
                "host": "localhost",
                "port": 27017,
                "username": "express",
                "password": "express",
                "database": "express",
                "synchronize": false,
                "logging": false,
                "entities": [
                    process.cwd() + "/src/entity/mongodb/*.ts",
                ],
                "useNewUrlParser": true,
            },
        },
        mongoose: {
            enabled: true,
            config: {
                "name": "mongoose-express",
                "type": "mongodb",
                "host": "localhost",
                "port": 27017,
                "username": "express",
                "password": "express",
                "database": "express",
                "synchronize": false,
                "logging": false,
                "entities": [
                    process.cwd() + "/src/entity/mongoose/*.ts",
                ],
                "useNewUrlParser": true,
            },
        },
    },
    redis: {
        port: 6379,
        host: "localhost",
    },
};

import * as objectAssign from "object-assign";

import { configCommon } from './config.common';

export const config = {
    server: configCommon.server,
    corsOptions: configCommon.corsOptions,
    swaggerConfig: {
        swaggerDefinition: objectAssign({}, configCommon.swaggerConfig.swaggerDefinition, {
            host: "localhost:5201",
        }),
        apis: configCommon.swaggerConfig.apis,
    },
    httpAuth: configCommon.httpAuth,
    database: {
        mysql: {
            config: objectAssign({}, configCommon.database.mysql.config, {
                port: 3306,
                entities: [
                    process.cwd() + "/build/entity/mysql/*.js",
                ],
            }),
        },
        mongodb: {
            config: objectAssign({}, configCommon.database.mongodb.config, {
                port: 27017,
                entities: [
                    process.cwd() + "/build/entity/mongodb/*.js",
                ],
            }),
        },
    },
    redis: configCommon.redis,
};

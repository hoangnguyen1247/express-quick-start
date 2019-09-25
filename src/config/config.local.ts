import * as objectAssign from "object-assign";

import { configCommon } from './config.common';

export const config = {
    version: configCommon.version,
    server: configCommon.server,
    corsOptions: configCommon.corsOptions,
    swaggerConfig: {
        swaggerDefinition: objectAssign({}, configCommon.swaggerConfig.swaggerDefinition, {
            host: "localhost:4201",
        }),
        apis: configCommon.swaggerConfig.apis,
    },
    httpAuth: configCommon.httpAuth,
    database: {
        mysql: {
            config: objectAssign({}, configCommon.database.mysql.config, {
                port: 3306,
            }),
        },
        mongodb: {
            config: objectAssign({}, configCommon.database.mongodb.config, {
                port: 27017,
            }),
        },
        mongoose: {
            config: objectAssign({}, configCommon.database.mongoose.config, {
                port: 27017,
            }),
        },
    },
    redis: configCommon.redis,
};

import { configCommon } from './config.common';

export const config = {
    version: configCommon.version,
    server: configCommon.server,
    corsOptions: configCommon.corsOptions,
    swaggerConfig: {
        swaggerDefinition: configCommon.swaggerConfig.swaggerDefinition,
        apis: configCommon.swaggerConfig.apis,
    },
    httpAuth: configCommon.httpAuth,
    database: {
        mysql: configCommon.database.mysql,
        mongodb: configCommon.database.mongodb,
        mongoose: configCommon.database.mongoose,
    },
    redis: configCommon.redis,
};

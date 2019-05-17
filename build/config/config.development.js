"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectAssign = require("object-assign");
var config_common_1 = require("./config.common");
exports.config = {
    server: config_common_1.configCommon.server,
    corsOptions: config_common_1.configCommon.corsOptions,
    swaggerConfig: {
        swaggerDefinition: objectAssign({}, config_common_1.configCommon.swaggerConfig.swaggerDefinition, {
            host: "api-dev.yourserver.com",
        }),
        apis: config_common_1.configCommon.swaggerConfig.apis,
    },
    httpAuth: config_common_1.configCommon.httpAuth,
    database: {
        mysql: {
            config: objectAssign({}, config_common_1.configCommon.database.mysql.config, {
                port: 3306,
            }),
        },
        mongodb: {
            config: objectAssign({}, config_common_1.configCommon.database.mongodb.config, {
                port: 27017,
            }),
        },
    },
    redis: config_common_1.configCommon.redis,
};
//# sourceMappingURL=config.development.js.map
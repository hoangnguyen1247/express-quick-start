"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_common_1 = require("./config.common");
exports.config = {
    server: config_common_1.configCommon.server,
    corsOptions: config_common_1.configCommon.corsOptions,
    swaggerConfig: {
        swaggerDefinition: config_common_1.configCommon.swaggerConfig.swaggerDefinition,
        apis: config_common_1.configCommon.swaggerConfig.apis,
    },
    httpAuth: config_common_1.configCommon.httpAuth,
    database: {
        mysql: config_common_1.configCommon.database.mysql,
        mongodb: config_common_1.configCommon.database.mongodb,
    },
    redis: config_common_1.configCommon.redis,
};
//# sourceMappingURL=config.production.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_local_1 = require("./config/config.local");
var config_development_1 = require("./config/config.development");
var config_staging_1 = require("./config/config.staging");
var config_production_1 = require("./config/config.production");
var selectedProfile = config_local_1.config;
switch (process.env.NODE_ENV) {
    case "development":
        selectedProfile = config_development_1.config;
        break;
    case "staging":
        selectedProfile = config_staging_1.config;
        break;
    case "production":
        selectedProfile = config_production_1.config;
        break;
    default:
        selectedProfile = config_local_1.config;
        break;
}
exports.config = selectedProfile;
//# sourceMappingURL=config.js.map
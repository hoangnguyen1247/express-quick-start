"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var auth = require("http-auth");
var config_1 = require("../config");
/**
 * Express status
 */
function StatusRouter(statusMonitor) {
    var router = express.Router();
    router.route("/*").get(auth.connect(auth.basic({ realm: 'Monitor Area' }, function (user, pass, callback) {
        callback(user === config_1.config.httpAuth.username && pass === config_1.config.httpAuth.password);
    })), statusMonitor.pageRoute);
    return router;
}
exports.StatusRouter = StatusRouter;
//# sourceMappingURL=StatusRouter.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var UserController_1 = require("./../controller/UserController");
function UserRouter(diContainer) {
    var router = express.Router();
    var userController = new UserController_1.UserController(diContainer);
    router.route("/").get(userController.findMany);
    return router;
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=UserRouter.js.map
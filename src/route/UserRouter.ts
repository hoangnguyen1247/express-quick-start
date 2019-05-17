import * as express from "express";

import { UserController } from './../controller/UserController';

export function UserRouter(diContainer) {
    const router = express.Router();
    const userController = new UserController(diContainer);

    router.route("/").get(userController.findMany);

    return router;
}

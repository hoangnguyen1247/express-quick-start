import * as express from "express";

import { UserController } from './../controller/UserController';

export function UserRouter(diContainer) {
    const router = express.Router();
    const userController = new UserController(diContainer);

    router.route("/")
        .get(userController.findMany)
        .post(userController.insert);

    router.route("/:id")
        .get(userController.findOneById)
        .put(userController.update)
        .delete(userController.delete);

    return router;
}

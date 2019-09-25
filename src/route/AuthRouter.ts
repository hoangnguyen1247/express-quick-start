import * as express from "express";

export function AuthRouter(diContainer) {
    const router = express.Router();

    router.route("/").get(async (req, res, next) => {
        res.render('index', {title: 'Express'});
    });

    return router;
}

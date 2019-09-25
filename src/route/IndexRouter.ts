import * as express from "express";

/**
 * Express index
 */
export function IndexRouter() {
    const router = express.Router();

    router.route("/").get(async (req, res, next) => {
        res.render('index', {
            title: 'Express',
        });
    });

    return router;
}

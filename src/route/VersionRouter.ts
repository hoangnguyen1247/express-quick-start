import * as express from "express";
import { config } from '../config';

/**
 * Express index
 */
export function VersionRouter() {
    const router = express.Router();

    router.route("/").get(async (req, res, next) => {
        res.render('version', { 
            title: "Version",
            shortVersion: config.version.shortVersion, 
            fullVersion: config.version.fullVersion, 
        });
    });

    return router;
}

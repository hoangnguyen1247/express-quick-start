import * as express from "express";
import * as auth from 'http-auth';

import { config } from "../config";

/**
 * Express status
 */
export function StatusRouter(statusMonitor) {

    const router = express.Router();

    router.route("/*").get(auth.connect(auth.basic({realm: 'Monitor Area'}, (user, pass, callback) => {
        callback(user === config.httpAuth.username && pass === config.httpAuth.password);
    })), statusMonitor.pageRoute);

    return router;
}

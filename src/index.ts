import "reflect-metadata";
// if (process.env.NODE_ENV === "local" && process.env.DEBUG === "true") {
    require('ts-node').register();
// }
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from 'cors';
import * as fs from "fs";
import * as path from "path";
import * as morgan from "morgan";
import * as rfs from 'rotating-file-stream';
import * as StatusMonitor from "express-status-monitor";
import * as auth from 'http-auth';

import * as swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";

import { config } from "./config";
// import { OAuthService } from "./service/OAuthService";
import { DIContainer } from "./di/DIContainer";
import { IndexRouter } from "./route/IndexRouter";
import { AuthRouter } from "./route/AuthRouter";
import { UserRouter } from "./route/UserRouter";
import { StatusRouter } from "./route/StatusRouter";
import { errorHandler, createNotFoundError } from "./controller/error/ErrorHandler";

import { MongodbConnector } from "./repository/mongodb/MongodbConnector";

const main = async () => {
    // create express app
    const app = express();
    const diContainer = (new DIContainer()).createRegister();
    const mongodbConnector = await (diContainer.get("mongodbConnector") as MongodbConnector).createConnection();
    const statusMonitor = StatusMonitor({ path: '' });

    // view engine setup
    app.set('views', path.resolve(__dirname, "..", "src", 'views'));
    app.set('view engine', 'hbs');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(statusMonitor.middleware);

    const logDirectory = path.resolve(__dirname, "..", 'log');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    // const accessLogStream = rfs('access.log', {
    //     interval: '1d', // rotate daily
    //     path: logDirectory
    // });
    // app.use(morgan('combined', { stream: accessLogStream }));

    app.use(cors(config.corsOptions));

    app.use("/", IndexRouter());

    app.use(express.static(path.resolve(__dirname, '..', 'public')));
    app.use(express.static(path.resolve(__dirname, '..', 'uploads')));

    app.use("/auth", AuthRouter(diContainer));
    app.use("/users", UserRouter(diContainer));
    app.use("/status", StatusRouter(statusMonitor));

    const options = config.swaggerConfig;
    const swaggerSpec = swaggerJSDoc(options);
    app.use('/swagger', auth.connect(auth.basic({ realm: 'Swagger Area' }, (user, pass, callback) => {
        callback(user === config.httpAuth.username && pass === config.httpAuth.password);
    })), swaggerUi.serve, swaggerUi.setup(swaggerSpec, false, { docExpansion: "none" })); // spec, showExplorer, opts, cusCSS

    // catch 404 and forward to error handler
    app.use(createNotFoundError);

    // error handler
    app.use(errorHandler);

    // start express server
    app.listen(config.server.port, () => {
        console.log(`Express server has started on port ${config.server.port}.`);
    });
}

main()
    .then(res => {

    })
    .catch(error => {
        console.log(error);
    });

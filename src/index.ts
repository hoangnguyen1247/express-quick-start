import "reflect-metadata";
if (process.env.NODE_ENV === "local" && process.env.DEBUG === "true") {
    require('ts-node').register();
}
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from 'cors';
import * as fs from "fs";
import * as path from "path";
import * as morgan from "morgan";
import * as rfs from 'rotating-file-stream';
import * as i18n from "i18n";
import * as StatusMonitor from "express-status-monitor";
import * as auth from 'http-auth';

import * as swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";

import { config } from "./config";
import { DIContainer } from "./di/DIContainer";
import { ErrorHandler } from "./controller/error/ErrorHandler";
import { IndexRouter } from "./route/IndexRouter";
import { AuthRouter } from "./route/AuthRouter";
import { UserRouter } from "./route/UserRouter";
import { StatusRouter } from "./route/StatusRouter";
import { VersionRouter } from "./route/VersionRouter";

import { MongodbConnector } from "./repository/mongodb/MongodbConnector";
import { MysqlConnector } from "./repository/mysql/MysqlConnector";
import { MongooseConnector } from "./repository/mongoose/MongooseConnector";

const main = async () => {
    // create express app
    const app = express();
    const diContainer = (new DIContainer()).createRegister();
    const mysqlConnector = await (diContainer.get("mysqlConnector") as MysqlConnector).createConnection();
    const mongodbConnector = await (diContainer.get("mongodbConnector") as MongodbConnector).createConnection();
    const mongooseConnector = await (diContainer.get("mongooseConnector") as MongooseConnector).createConnection();
    const errorHandler: ErrorHandler = diContainer.get("errorHandler");

    const statusMonitor = StatusMonitor({ path: '' });

    // view engine setup
    app.set('views', path.resolve(__dirname, "..", "src", 'views'));
    app.set('view engine', 'hbs');

    // body & cookie parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    //
    // i18n
    i18n.configure({
        locales: ['en', 'vi'],
        directory: __dirname + '/locales',
        queryParameter: 'lang',
        defaultLocale: 'vi',
        objectNotation: true,
        updateFiles: false,
    });
    app.use(i18n.init);

    //
    // status monitor
    app.use(statusMonitor.middleware);

    //
    // request log
    const logDirectory = path.resolve(__dirname, "..", 'log');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    const accessLogStream = rfs('access.log', {
        interval: '1d', // rotate daily
        path: logDirectory
    });
    app.use(morgan('combined', { stream: accessLogStream }));

    //
    // cors
    app.use(cors(config.corsOptions));

    //
    // index routes
    app.use("/", IndexRouter());

    app.use(express.static(path.resolve(__dirname, '..', 'public')));
    app.use(express.static(path.resolve(__dirname, '..', 'uploads')));

    app.use("/auth", AuthRouter(diContainer));
    app.use("/users", UserRouter(diContainer));
    app.use("/status", StatusRouter(statusMonitor));
    app.use("/version", VersionRouter());

    const options = config.swaggerConfig;
    const swaggerSpec = swaggerJSDoc(options);
    app.use('/swagger', auth.connect(auth.basic({ realm: 'Swagger Area' }, (user, pass, callback) => {
        callback(user === config.httpAuth.username && pass === config.httpAuth.password);
    })), swaggerUi.serve, swaggerUi.setup(swaggerSpec, false, { docExpansion: "none" })); // spec, showExplorer, opts, cusCSS

    // catch 404 and forward to error handler
    app.use(errorHandler.createServiceUnavailableError);

    // error handler
    app.use(errorHandler.errorHandler);

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

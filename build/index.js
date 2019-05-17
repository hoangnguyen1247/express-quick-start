"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
if (process.env.NODE_ENV === "local" && process.env.DEBUG === "true") {
    require('ts-node').register();
}
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var fs = require("fs");
var path = require("path");
var StatusMonitor = require("express-status-monitor");
var auth = require("http-auth");
var swaggerJSDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var config_1 = require("./config");
// import { OAuthService } from "./service/OAuthService";
var DIContainer_1 = require("./di/DIContainer");
var IndexRouter_1 = require("./route/IndexRouter");
var AuthRouter_1 = require("./route/AuthRouter");
var UserRouter_1 = require("./route/UserRouter");
var StatusRouter_1 = require("./route/StatusRouter");
var ErrorHandler_1 = require("./controller/error/ErrorHandler");
var main = function () { return __awaiter(_this, void 0, void 0, function () {
    var app, diContainer, mongodbConnector, statusMonitor, logDirectory, options, swaggerSpec;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = express();
                diContainer = (new DIContainer_1.DIContainer()).createRegister();
                return [4 /*yield*/, diContainer.get("mongodbConnector").createConnection()];
            case 1:
                mongodbConnector = _a.sent();
                statusMonitor = StatusMonitor({ path: '' });
                // view engine setup
                app.set('views', path.resolve(__dirname, "..", "src", 'views'));
                app.set('view engine', 'hbs');
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({ extended: false }));
                app.use(cookieParser());
                app.use(statusMonitor.middleware);
                logDirectory = path.resolve(__dirname, "..", 'log');
                fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
                // const accessLogStream = rfs('access.log', {
                //     interval: '1d', // rotate daily
                //     path: logDirectory
                // });
                // app.use(morgan('combined', { stream: accessLogStream }));
                app.use(cors(config_1.config.corsOptions));
                app.use("/", IndexRouter_1.IndexRouter());
                app.use(express.static(path.resolve(__dirname, '..', 'public')));
                app.use(express.static(path.resolve(__dirname, '..', 'uploads')));
                app.use("/auth", AuthRouter_1.AuthRouter(diContainer));
                app.use("/users", UserRouter_1.UserRouter(diContainer));
                app.use("/status", StatusRouter_1.StatusRouter(statusMonitor));
                options = config_1.config.swaggerConfig;
                swaggerSpec = swaggerJSDoc(options);
                app.use('/swagger', auth.connect(auth.basic({ realm: 'Swagger Area' }, function (user, pass, callback) {
                    callback(user === config_1.config.httpAuth.username && pass === config_1.config.httpAuth.password);
                })), swaggerUi.serve, swaggerUi.setup(swaggerSpec, false, { docExpansion: "none" })); // spec, showExplorer, opts, cusCSS
                // catch 404 and forward to error handler
                app.use(ErrorHandler_1.createNotFoundError);
                // error handler
                app.use(ErrorHandler_1.errorHandler);
                // start express server
                app.listen(config_1.config.server.port, function () {
                    console.log("Express server has started on port " + config_1.config.server.port + ".");
                });
                return [2 /*return*/];
        }
    });
}); };
main()
    .then(function (res) {
})
    .catch(function (error) {
    console.log(error);
});
//# sourceMappingURL=index.js.map
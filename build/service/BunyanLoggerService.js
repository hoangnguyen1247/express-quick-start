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
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var bunyan = require("bunyan");
var logging_bunyan_1 = require("@google-cloud/logging-bunyan");
var BunyanLoggerService = /** @class */ (function () {
    function BunyanLoggerService() {
        var _this = this;
        this.info = function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._logger.info(value);
                return [2 /*return*/];
            });
        }); };
        this.error = function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._logger.error(value);
                return [2 /*return*/];
            });
        }); };
        // Creates a Bunyan Stackdriver Logging client
        var loggingBunyan = new logging_bunyan_1.LoggingBunyan({
            projectId: "heramo-com",
            keyFilename: path.resolve(__dirname, "..", "..", "heramo-com-42f6455daea7.json"),
        });
        // Create a Bunyan logger that streams to Stackdriver Logging
        // Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
        this._logger = bunyan.createLogger({
            // The JSON payload of the log as it appears in Stackdriver Logging
            // will contain "name": "my-service"
            name: 'my-service',
            streams: [
                // Log to the console at 'info' and above
                { stream: process.stdout, level: 'error' },
                // And log to Stackdriver Logging, logging at 'info' and above
                loggingBunyan.stream('error'),
            ],
        });
    }
    return BunyanLoggerService;
}());
exports.BunyanLoggerService = BunyanLoggerService;
//# sourceMappingURL=BunyanLoggerService.js.map
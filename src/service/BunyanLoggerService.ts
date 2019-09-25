import * as path from "path";
import * as bunyan from 'bunyan';
import { LoggingBunyan } from '@google-cloud/logging-bunyan';

export class BunyanLoggerService {

    private _logger;

    constructor() {
        // Creates a Bunyan Stackdriver Logging client
        const loggingBunyan = new LoggingBunyan({
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
                {stream: process.stdout, level: 'error'},
                // And log to Stackdriver Logging, logging at 'info' and above
                loggingBunyan.stream('error'),
            ],
        });
    }

    info = async (value) => {
        this._logger.info(value);
    };

    error = async (value) => {
        this._logger.error(value);
    };
}

import { createConnection, Connection } from 'typeorm';

import { config } from "../../config";

export class MysqlConnector {

    _connection: Connection;

    constructor() {
    }

    createConnection = async () => {
        try {
            if (!this._connection) {
                this._connection = await createConnection(config.database.mysql.config);
            }
        } catch (error) {
            console.error("Setting connection error: " + error);
        }
    }

    getConnection = () => {
        return this._connection;
    }
}

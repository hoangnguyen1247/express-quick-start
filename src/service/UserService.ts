import * as createError from "http-errors";

import { IMysqlUserRepository } from "../abstract/repository/mysql/IMysqlUserRepository.";
import { IMongodbBaseRepository } from './../abstract/repository/mongodb/IMongodbBaseRepository';
import { User } from "../entity/mysql/User";

export class UserService {

    private _mysqlUserRepository: IMysqlUserRepository;
    private _mongodbUserRepository: IMongodbBaseRepository;

    constructor(mysqlUserRepository, mongodbUserRepository) {
        
        this._mysqlUserRepository = mysqlUserRepository;
        this._mongodbUserRepository = mongodbUserRepository;
    }

    findMany = async(page, size) => {
        try {
            const result = await this._mysqlUserRepository.findMany(page, size);
            // const result = await this._mongodbUserRepository.findMany(page, size);

            return {
                data: {
                    code: 200,
                    users: result[0],
                    totalItems: result[1],
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    }

    findOneById = async(id) => {
        try {
            const entityInDb = await this._mysqlUserRepository.findOneById(id);

            if (!entityInDb) {
                return { error: createError(404, "", {
                    error: { errorCode: "entityNotFound" },
                })}
            }

            return {
                data: {
                    code: 200,
                    user: entityInDb,
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    }

    insert = async(data) => {
        try {
            const entityInDb = await this._mysqlUserRepository.insert(new User(data));

            return {
                data: {
                    code: 200,
                    user: entityInDb,
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    }

    update = async(id, data) => {
        try {
            const entityInDb = await this._mysqlUserRepository.findOneById(id);

            if (!entityInDb) {
                return { error: createError(404, "", {
                    error: { errorCode: "entityNotFound" },
                })}
            }

            entityInDb.fullName = data.fullName;
            entityInDb.lastModifiedDate = data.lastModifiedDate;

            await this._mysqlUserRepository.update(entityInDb);

            return {
                data: {
                    code: 200,
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    }

    delete = async(id) => {
        try {
            const entityInDb = await this._mysqlUserRepository.findOneById(id);

            if (!entityInDb) {
                return { error: createError(404, "", {
                    error: { errorCode: "entityNotFound" },
                })}
            }

            await this._mysqlUserRepository.delete(entityInDb);

            return {
                data: {
                    code: 200,
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    }
}
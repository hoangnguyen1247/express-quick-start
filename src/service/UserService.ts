import * as createError from "http-errors";

import { IMysqlUserRepository } from "../abstract/repository/mysql/IMysqlUserRepository";
import { IMongodbUserRepository } from "../abstract/repository/mongodb/IMongodbUserRepository";
import { IMongooseUserRepository } from "../abstract/repository/mongoose/IMongooseUserRepository";

export class UserService {

    private _mysqlUserRepository: IMysqlUserRepository;
    private _mongodbUserRepository: IMongodbUserRepository;
    private _mongooseUserRepository: IMongooseUserRepository;

    constructor(mysqlUserRepository, mongodbUserRepository, mongooseUserRepository) {
        
        this._mysqlUserRepository = mysqlUserRepository;
        this._mongodbUserRepository = mongodbUserRepository;
        this._mongooseUserRepository = mongooseUserRepository;
    }

    findMany = async(page, size) => {
        try {
            // const result = await this._mysqlUserRepository.findMany(page, size);
            // const result = await this._mongodbUserRepository.findMany(page, size);
            const result = await this._mongooseUserRepository.findMany(page, size);

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
            // const entityInDb = await this._mysqlUserRepository.findOneById(id);
            // const entityInDb = await this._mongodbUserRepository.findOneById(id);
            const entityInDb = await this._mongooseUserRepository.findOneById(id);

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
            // const entityInDb = await this._mysqlUserRepository.insert(new User(data));
            // const entityInDb = await this._mongodbUserRepository.insert(data);
            const entityInDb = await this._mongooseUserRepository.insert(data);

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
            // const entityInDb = await this._mysqlUserRepository.findOneById(id);
            // const entityInDb = await this._mongodbUserRepository.findOneById(id);
            const entityInDb = await this._mongooseUserRepository.findOneById(id);

            if (!entityInDb) {
                return { error: createError(404, "", {
                    error: { errorCode: "entityNotFound" },
                })}
            }

            entityInDb.fullName = data.fullName;
            entityInDb.lastModifiedDate = data.lastModifiedDate;

            // await this._mysqlUserRepository.update(entityInDb);
            // await this._mongodbUserRepository.update(entityInDb);
            await this._mongooseUserRepository.update(entityInDb);

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
            // const entityInDb = await this._mysqlUserRepository.findOneById(id);
            // const entityInDb = await this._mongodbUserRepository.findOneById(id);
            const entityInDb = await this._mongooseUserRepository.findOneById(id);

            if (!entityInDb) {
                return { error: createError(404, "", {
                    error: { errorCode: "entityNotFound" },
                })}
            }

            // await this._mysqlUserRepository.delete(entityInDb);
            // await this._mongodbUserRepository.delete(entityInDb);
            await this._mongooseUserRepository.delete(entityInDb);

            return {
                data: {
                    code: 200,
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    }

    searchAndFilter = async(searchKey, searchFields, filters, page, size) => {
        try {
            // const result = await this._mysqlUserRepository.searchAndFilter(searchKey, searchFields, filters, page, size);
            // const result = await this._mongodbUserRepository.searchAndFilter(searchKey, searchFields, filters, page, size);
            const result = await this._mongooseUserRepository.searchAndFilter(searchKey, searchFields, filters, page, size);

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
}
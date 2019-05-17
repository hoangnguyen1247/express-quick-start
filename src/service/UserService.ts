import * as createError from "http-errors";

import { IMongodbBaseRepository } from './../abstract/repository/mongodb/IMongodbBaseRepository';

export class UserService {

    private _mongodbUserRepository: IMongodbBaseRepository;

    constructor(mongodbUserRepository) {
        
        this._mongodbUserRepository = mongodbUserRepository;
    }

    findMany = async(page, size) => {
        try {
            const result = await this._mongodbUserRepository.findMany(page, size);

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
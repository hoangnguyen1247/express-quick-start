import { MongoRepository } from "typeorm";

import { IMongodbBaseRepository } from "../../abstract/repository/mongodb/IMongodbBaseRepository";

export abstract class MongodbBaseRepository<T> implements IMongodbBaseRepository {

    protected _connection;
    protected _baseRepository: MongoRepository<T>;

    protected constructor(baseRepository) {
        this._baseRepository = baseRepository;
    }

    findMany = async (page: number, size: number) => {
        return await this._baseRepository.findAndCount({
            skip: page * size,
            take: size,
        });
    };

    findOneById = async (id: number) => {
        return await this._baseRepository.findOne(id);
    };

    insert = async (entity: T) => {
        return await this._baseRepository.save(entity);
    };

    update = async (entity: T) => {
        return await this._baseRepository.save(entity);
    };

    delete = async (entity) => {
        return await this._baseRepository.remove(entity);
    };
}

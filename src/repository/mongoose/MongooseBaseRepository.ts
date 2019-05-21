import * as mongoose from "mongoose";

import { IMongooseBaseRepository } from "../../abstract/repository/mongoose/IMongooseBaseRepository";

export abstract class MongooseBaseRepository<T extends mongoose.Document> implements IMongooseBaseRepository {

    protected _baseRepository: mongoose.Model<T>;

    protected constructor(baseRepository) {
        this._baseRepository = baseRepository;
    }

    findMany = async (page, size) => {
        const data = await this._baseRepository
            .find({}, {}, {
                skip: page * size,
                limit: parseInt(size, 10),
            });

        const count = await this._baseRepository.countDocuments({});

        return [
            data,
            count,
        ];
    };

    findOneById = async (id) => {
        return await this._baseRepository.findById(id);
    };

    insert = async (entity: T) => {
        return await this._baseRepository.create(entity);
    };

    update = async (entity: T) => {
        return await this._baseRepository.findOneAndUpdate(entity.id, entity);
    };

    delete = async (id) => {
        return await this._baseRepository.findOneAndRemove(id);
    };

    findOne = async (filters) => {
        return await this._baseRepository.findOne(filters);
    };

    searchAndFilter = async (searchKey, searchFields = [], filters, page, size) => {
        const query = this._baseRepository.find();
        const countQuery = this._baseRepository.countDocuments();

        if (searchKey && Array.isArray(searchFields) && searchFields.length > 0) {
            query.where({
                $or: [
                    ...searchFields.map(item => { return { [item]: searchKey } }),
                ],
            });
            countQuery.where({
                $or: [
                    ...searchFields.map(item => { return { [item]: searchKey } }),
                ],
            });
        }

        if (filters["name"]) {
            query.where({ name: { "$regex": filters["name"], "$options": "i" } });
            countQuery.where({ name: { "$regex": filters["name"], "$options": "i" } });
        }

        if (page && size) {
            query.skip(page * size);
            query.limit(parseInt(size, 10));
        }

        const data = await query.exec();
        const count = await countQuery.exec();

        return [
            data,
            count,
        ];
    };

    insertMany = async (entities: T[]) => {
        return await this._baseRepository.insertMany(entities);
    };
}

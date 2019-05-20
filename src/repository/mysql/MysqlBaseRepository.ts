import { IMysqlBaseRepository } from "../../abstract/repository/mysql/IMysqlBaseRepository";

export abstract class MysqlBaseRepository<T> implements IMysqlBaseRepository {

    protected _connection;;
    protected _baseRepository;

    protected constructor(baseRepository) {
        this._baseRepository = baseRepository;
    }

    findMany = async (page: number, size: number) => {
        return await this._baseRepository.findAndCount({
            skip: page * size,
            take: size,
            order: { lastModifiedDate: "DESC" },
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

    delete = async (entity: T) => {
        return await this._baseRepository.remove(entity);
    };

    deleteById = async(id: number) => {
        const entityToDelete = await this._baseRepository.findOne(id);

        if (entityToDelete) {
            return await this._baseRepository.remove(entityToDelete);
        }

        return entityToDelete;
    };

    searchAndFilter = async() => {
        const data = await this._baseRepository.find({

        });

        const count = await this._baseRepository.countDocuments({

        });

        return [
            data,
            count,
        ];
    }
}

import { Brackets, Repository } from "typeorm";

import { IMysqlBaseRepository } from "../../abstract/repository/mysql/IMysqlBaseRepository";

export abstract class MysqlBaseRepository<T> implements IMysqlBaseRepository {

    protected _baseRepository: Repository<T>;

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

    searchAndFilter = async(searchKey, searchFields, filters, page, size) => {
        const query = this._baseRepository
            .createQueryBuilder("entity")
            .where("1 = 1");

        const countQuery = await this._baseRepository
            .createQueryBuilder("entity")
            .select("COUNT(entity.id)", "count")
            .where("1 = 1");

        if (searchKey) {
            query.andWhere(new Brackets(qb => {
                qb.where("0 = 1");
                if (searchFields.indexOf("fullName") > -1) {
                    qb.orWhere(`entity.fullName LIKE :fullName`, {fullName: '%' + searchKey + '%'});
                }
                if (searchFields.indexOf("phoneNumber") > -1) {
                    qb.orWhere(`entity.phoneNumber LIKE :phoneNumber`, {phoneNumber: '%' + searchKey + '%'});
                }
                if (searchFields.indexOf("email") > -1) {
                    qb.orWhere(`entity.email LIKE :email`, {email: '%' + searchKey + '%'});
                }
            }));
            countQuery.andWhere(new Brackets(qb => {
                qb.where("0 = 1");
                if (searchFields.indexOf("fullName") > -1) {
                    qb.orWhere(`entity.fullName LIKE :fullName`, {fullName: '%' + searchKey + '%'});
                }
                if (searchFields.indexOf("phoneNumber") > -1) {
                    qb.orWhere(`entity.phoneNumber LIKE :phoneNumber`, {phoneNumber: '%' + searchKey + '%'});
                }
                if (searchFields.indexOf("email") > -1) {
                    qb.orWhere(`entity.email LIKE :email`, {email: '%' + searchKey + '%'});
                }
            }));
        }

        if (filters.createdDate) {
            query.andWhere(`DATE(entity.createdDate) = :createdDate`, {createdDate: filters.createdDate || ""});
            countQuery.andWhere(`DATE(entity.createdDate) = :createdDate`, {createdDate: filters.createdDate || ""});
        }

        // order by
        query.orderBy("entity.createdDate", "DESC")

        // offset, limit
        if (page && size) {
            query.offset(page * size).limit(size);
        }
        const data = await query.getMany();
        const count = await countQuery.getRawOne();

        return [
            data,
            count && count.count ? parseInt(count.count, 10) : 0,
        ];
    }
}

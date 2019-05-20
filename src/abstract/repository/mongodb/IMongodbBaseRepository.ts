export interface IMongodbBaseRepository {

    findMany(page, size): Promise<any>;

    findOneById(id): Promise<any>;

    insert(entity): Promise<any>;

    update(entity): Promise<any>;

    delete(entity): Promise<any>;
}

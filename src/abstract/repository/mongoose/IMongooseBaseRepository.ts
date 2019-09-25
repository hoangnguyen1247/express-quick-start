export interface IMongooseBaseRepository {

    findMany(page, size): Promise<any>;

    findOneById(id): Promise<any>;

    insert(entity): Promise<any>;

    update(entity): Promise<any>;

    delete(entity): Promise<any>;

    searchAndFilter(searchKey, searchFields, filters, page, size): Promise<any>;

    insertMany(entities): Promise<any>;
}

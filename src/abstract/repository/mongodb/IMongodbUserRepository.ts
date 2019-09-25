import { IMongodbBaseRepository } from './IMongodbBaseRepository';

export interface IMongodbUserRepository extends IMongodbBaseRepository {

    searchAndFilter(searchKey, searchFields, filters, page, size): Promise<any>;
}

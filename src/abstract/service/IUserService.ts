
export interface IUserService {

    findMany(page, size): Promise<any>;

    findOneById(id): Promise<any>;

    insert(data): Promise<any>;

    update(id, data): Promise<any>;

    delete(id): Promise<any>;
}

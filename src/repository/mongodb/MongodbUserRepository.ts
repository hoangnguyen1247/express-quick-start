
import { User } from '../../entity/mongodb/User';
import { IMongodbUserRepository } from '../../abstract/repository/mongodb/IMongodbUserRepository';
import { MongodbConnector } from './MongodbConnector';
import { MongodbBaseRepository } from './MongodbBaseRepository';

export class MongodbUserRepository extends MongodbBaseRepository<User> implements IMongodbUserRepository {

    constructor(mongodbConnector: MongodbConnector) {
        super(mongodbConnector.getConnection().getMongoRepository(User));
    }

    searchAndFilter = async (searchKey, searchFields, filters, page, size) => {
        const data = await this._baseRepository.find({

        });

        const count = await this._baseRepository.count({

        });

        return [
            data,
            count,
        ];
    }
}

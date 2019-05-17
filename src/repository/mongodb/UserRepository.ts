
import { User } from './../../entity/mongo/User';
import { IMongodbUserRepository } from './../../abstract/repository/mongodb/IMongodbUserRepository.';
import { MongodbConnector } from './MongodbConnector';
import { MongodbBaseRepository } from './MongodbBaseRepository';

export class UserRepository extends MongodbBaseRepository<User> implements IMongodbUserRepository {

    constructor(mongodbConnector: MongodbConnector) {
        super(mongodbConnector.getConnection().getMongoRepository(User));
    }
}

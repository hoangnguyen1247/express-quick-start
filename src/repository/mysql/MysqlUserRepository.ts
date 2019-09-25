import { User } from '../../entity/mysql/User';
import { IMysqlUserRepository } from '../../abstract/repository/mysql/IMysqlUserRepository';
import { MysqlConnector } from './MysqlConnector';
import { MysqlBaseRepository } from './MysqlBaseRepository';

export class MysqlUserRepository extends MysqlBaseRepository<User> implements IMysqlUserRepository {

    constructor(mysqlConnector: MysqlConnector) {
        super(mysqlConnector.getConnection().getRepository(User));
    }
}

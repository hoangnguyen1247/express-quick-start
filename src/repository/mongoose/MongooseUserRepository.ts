import { IUser, UserSchema } from "../../entity/mongoose/User";
import { IMongooseUserRepository } from "../../abstract/repository/mongoose/IMongooseUserRepository";
import { MongooseConnector } from "./MongooseConnector";
import { MongooseBaseRepository } from "./MongooseBaseRepository";

export class MongooseUserRepository extends MongooseBaseRepository<IUser> implements IMongooseUserRepository {

    constructor(mongooseConnector: MongooseConnector) {
        super(mongooseConnector.getConnection().model<IUser>("User", UserSchema, "user"));
    }
}

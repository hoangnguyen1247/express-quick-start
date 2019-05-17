"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./../../entity/mongo/User");
var MongodbBaseRepository_1 = require("./MongodbBaseRepository");
var UserRepository = /** @class */ (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository(mongodbConnector) {
        return _super.call(this, mongodbConnector.getConnection().getMongoRepository(User_1.User)) || this;
    }
    return UserRepository;
}(MongodbBaseRepository_1.MongodbBaseRepository));
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map
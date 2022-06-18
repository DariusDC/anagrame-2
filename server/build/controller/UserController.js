"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("./../service/UserService");
class UserController {
    constructor() {
        this.userService = new UserService_1.UserService();
    }
}
exports.UserController = UserController;

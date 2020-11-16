"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(param) {
        this.login = param.login;
        this.avatar = param.avatar_url;
        this.bio = param.bio;
        this.reposNum = param.public_repos;
    }
    return User;
}());
exports.User = User;

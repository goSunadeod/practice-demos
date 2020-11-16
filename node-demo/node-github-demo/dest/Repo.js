"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repo = void 0;
var Repo = /** @class */ (function () {
    function Repo(param) {
        this.name = param.name;
        this.desc = param.description;
        this.url = param.html_url;
        this.forksCount = param.forks_count;
    }
    return Repo;
}());
exports.Repo = Repo;

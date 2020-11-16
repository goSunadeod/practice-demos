"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
var request = __importStar(require("request"));
var User_1 = require("./User");
var Repo_1 = require("./Repo");
var GithubService = /** @class */ (function () {
    function GithubService() {
    }
    GithubService.prototype.getUserInfo = function (userName) {
        var url = "https://api.github.com/users/" + userName;
        return new Promise(function (resolve) {
            request.get(url, {
                headers: {
                    'User-Agent': 'request'
                },
                json: true
            }, function (err, response, body) {
                if (err)
                    console.log('错误' + err);
                var user = new User_1.User(body);
                resolve(user);
            });
        });
    };
    GithubService.prototype.getUserRepos = function (userName) {
        var url = "https://api.github.com/users/" + userName + "/repos";
        return new Promise(function (resolve) {
            request.get(url, {
                headers: {
                    'User-Agent': 'request'
                },
                json: true
            }, function (err, response, body) {
                if (err)
                    console.log('错误' + err);
                var repos = body.map(function (item) { return new Repo_1.Repo(item); }).sort(function (a, b) {
                    return b.forksCount - a.forksCount;
                }).filter(function (a) {
                    return a.forksCount > 1000;
                });
                resolve(repos);
            });
        });
    };
    return GithubService;
}());
exports.GithubService = GithubService;

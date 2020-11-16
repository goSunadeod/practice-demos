"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GithubService_1 = require("./GithubService");
var service = new GithubService_1.GithubService();
if (process.argv.length < 3) {
    console.log('请输入github用户名');
}
else {
    var userName = process.argv[2];
    service.getUserInfo(userName).then(function (user) {
        console.log(user);
    });
    service.getUserRepos(userName).then(function (data) {
        console.log(data);
    });
}

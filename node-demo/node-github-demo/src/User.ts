export class User {
  login: string;
  avatar: string;
  bio: string;
  reposNum: number;
  constructor(param: any) {
    this.login = param.login
    this.avatar = param.avatar_url
    this.bio = param.bio
    this.reposNum = param.public_repos
  }
}
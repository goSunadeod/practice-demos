export class Repo {
  name: string;
  desc: string;
  url: string;
  forksCount: number;
  constructor(param: any) {
    this.name = param.name
    this.desc = param.description
    this.url = param.html_url
    this.forksCount = param.forks_count
  }
}
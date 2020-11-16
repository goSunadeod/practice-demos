import * as request from 'request'
import { User } from './User'
import { Repo } from './Repo'

export class GithubService {
  getUserInfo(userName: string) {
    let url = `https://api.github.com/users/${userName}`
    return new Promise(resolve => {
      request.get(url, {
        headers: {
          'User-Agent': 'request'
        },
        json: true
      }, (err: any, response: any, body: any) => {
        if (err) console.log('错误' + err)

        let user: User = new User(body)
        resolve(user)
      })
    })
  }

  getUserRepos(userName: string) {
    let url = `https://api.github.com/users/${userName}/repos`
    return new Promise(resolve => {
      request.get(url, {
        headers: {
          'User-Agent': 'request'
        },
        json: true
      }, (err: any, response: any, body: any) => {
        if (err) console.log('错误' + err)
        let repos: Repo[] = body.map((item: any) => new Repo(item)).sort((a: Repo, b: Repo) => {
          return b.forksCount - a.forksCount
        }).filter((a: Repo) => {
          return a.forksCount > 1000
        })
        resolve(repos)
      })
    })
  }
}
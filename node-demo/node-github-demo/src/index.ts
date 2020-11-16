import { GithubService } from './GithubService'

let service = new GithubService();

if (process.argv.length < 3) {
  console.log('请输入github用户名')
} else {
  let userName = process.argv[2]
  service.getUserInfo(userName).then(user => {
    console.log(user)
  })

  service.getUserRepos(userName).then(data => {
    console.log(data)
  })

}

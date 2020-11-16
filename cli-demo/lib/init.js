const { promisify } = require('util')
const inquirer = require('inquirer');

const figlet = promisify(require('figlet'))

const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const { clone } = require('./download')

const question = [
  {
    type: 'list',
    name: 'css',
    message: 'css预编译',
    choices: [
      'less',
      'sass',
      'stylus'
    ]
  },
  {
    type: 'confirm',
    name: 'ok',
    message: 'are you ok',
    default: true
  }
]

const spawn = async (...args) => {
  const { spawn } = require('child_process'); //子进程
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}

module.exports = async name => {
  clear()
  const data = await figlet('Sun Welcome')
  log(data)


  inquirer.prompt(question).then(answer => {
    console.log(answer);
  })

  clone
  log('🚀创建项目: ' + name)
  await clone('github:su37josephxia/vue-template', name)

  自动安装依赖
  log('🔨安装依赖')
  await spawn('npm', ['install'], { cwd: `./${name}` })
  log('👌安装完成')

}
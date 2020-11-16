const fs = require('fs');
const handlebars = require('handlebars');
const chalk = require('chalk');

/**
 * 模板编译
 * @param {*} meta 数据定义
 * @param {*} filePath 目标文件
 * @param {*} templatePath 模板文件
 */
function compile(meta, filePath, templatePath) {
  if (fs.existsSync(templatePath)) { //判别路径是否存在
    const content = fs.readFileSync(templatePath).toString() // 返回内容
    const result = handlebars.compile(content)(meta) //编译模板
    fs.writeFileSync(filePath, result) // 写入
    console.log(`${filePath} 创建成功`)
  }
}

module.exports = async () => {
  // 获取列表 => [{ name: 'about', file: 'About.vue' }]
  const list = fs.readdirSync('./src/views').filter(v => v !== 'Home.vue').map(v => (
    {
      name: v.replace('.vue', '').toLocaleLowerCase(),
      file: v
    }
  ))

  // 生成路由自定义
  compile({ list }, './src/router.js', './template/router.js.hbs')

  // 生成菜单
  compile({ list }, './src/App.vue', './template/App.vue.hbs')

}
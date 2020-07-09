const { name } = require('./package')

const port = 6662

module.exports = {
  devServer: {
    port,
    // 允许被主应用跨域fetch请求到
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  lintOnSave: false,
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      // 把子应用打包成umd库格式
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
}
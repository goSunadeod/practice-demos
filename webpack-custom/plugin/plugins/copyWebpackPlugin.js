// build 时 输出hello, my plugin 并 生成copyright.txt
class CopyWebpackPlugin {
  constructor(options) {
    console.log(`${options.name} hello, my plugin`);
  }
  apply(compiler) {
    // 参考 https://webpack.docschina.org/api/compiler-hooks/#emit
    // emit => 输出 asset 到 output 目录之前执行。
    // tapAsync => tapable 同步
    compiler.hooks.emit.tapAsync('CopyWebpackPlugin', (compilation, cb) => {
      var copyrightText = 'copyright by why';
      compilation.assets['copyright.txt'] = {
        source: function () {
          return copyrightText
        },
        size: function () {
          return copyrightText.length;
        }
      }
      cb();
    })
  }
}
module.exports = CopyWebpackPlugin;
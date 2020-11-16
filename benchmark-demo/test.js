var benchmark = require('benchmark')
var suite = new benchmark.Suite
//添加测试
suite.add('RegExp', function () {
  /o/.test('Hello World');
})
  .add('indexof', function () {
    'Hello World'.indexOf('o');
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('the fasted method is ' + this.filter('fastest').map('name')) // 打印最快的方法
  })
  .run({ 'async': true });
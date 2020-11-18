// Webpack is good! => Webpack is very good!

const loaderUtils = require('loader-utils');
module.exports = function (source) {
  var options = loaderUtils.getOptions(this);
  var callback = this.async();
  setTimeout(() => {
    var result = source.replace('good', `${options.name} very good`);
    // callback(error, result, sourceMap?, meta?)
    callback(null, result);
  })

}
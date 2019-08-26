const proxy = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
      proxy(
        '/api',
        {
            target: ' https://www.easy-mock.com/mock/5b860d1cfabccc2bb7e306f8',
            changeOrigin: true
        }
      )
    )
}
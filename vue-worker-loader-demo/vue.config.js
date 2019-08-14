module.exports = {
  chainWebpack: config => {
    config.module.rule("js").exclude.add(/\.worker\.js$/);
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: "worker-loader" }
        }
      ]
    }
  }
};
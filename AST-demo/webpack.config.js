const path = require('path');
module.exports={
    mode:'development',
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename:'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader', // 编译顺序为首先plugins从左往右,然后presets从右往左
                    options: {
                        plugins:[['import',{library:'lodash'}]] // 在node_modules中新建babel-plugin-import/index.js
                    }
                }
            }
        ]
    }
}

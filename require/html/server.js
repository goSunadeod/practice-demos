const express = require('express')

const path = require('path')

const app = express()

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './test.html'))
})

app.listen(8090)

// 启动
//  ./node_modules/.bin/nodemon server.js

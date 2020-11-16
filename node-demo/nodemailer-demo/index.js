var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  secureConnection: true,
  port: 465,
  secure: true,
  auth: {
    user: 'xhq51886@163.com',
    pass: 'xxx' // 授权码
  }
})

var mailOptions = {
  from: 'xhq51886@163.com',
  to: 'xxx@qq.com',
  subject: '欢迎测试sundae',
  // text: `你好啊，哈哈哈～`
  html: `<h2>自动化邮件测试</h2><p>雷好！峰少 想屁吃呢 啊？ 小文件？？？ 抓紧学习工作 傻屌</p>`,
  attachments: [{
    filename: 'index.js',
    path: './index.js'
  }]
}

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err)
  } else {
    console.log('邮件发送：' + info.response)
  }

})
const puppeteer = require('puppeteer');
const targetTime = +new Date('2020-9-2 22:25:21')
const time = +new Date();
puppeteer.launch({
  headless: false,
  defaultViewport: {
    width: 1200,
    height: 800
  }
}).then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://login.taobao.com/');
  page.on('frameattached', async () => {
    if (page.url().includes('https://i.taobao.com/')) {
      // 跳转到购物车
      await Promise.all([
        page.waitForNavigation(),
        page.click('a#mc-menu-hd')
      ])
      // 点击全选按钮
      await page.click('#J_SelectAll2')
      // 等1秒，因为网页上的点击是有延迟的，估计是用 ajax 异步勾选的
      await page.waitFor(1000)
      // 点击结算按钮
      while (true) {
        if (Date.now() >= targetTime) {
          page.click('#J_Go')
          break
        } else if (Date.now() - time >= 300000) {
          break
        }
      }
    } else if (page.url().includes('https://buy.taobao.com/')) {
      await page.click('a.go-btn')
      const date = new Date()
      console.info(date.toLocaleString(), ' : ', date.getMilliseconds(), ' 抢到，请尽快付款')
      await page.waitFor(2000)
      await browser.close();
    }
  })
});
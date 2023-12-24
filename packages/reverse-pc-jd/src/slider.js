/**
 * @file 京东滑块
 * @description 2023-12-25
 */

import puppeteer from 'puppeteer'
import { delaySyncWithConsole, getRandom } from 'reverse-shared/tools'

const domain = 'https://passport.jd.com'

// TODO
const get_track = () => {
  const value = 0
  const distance = (value * 278) / 360
  return distance
}

const slider = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.setViewport({ width: 1366, height: 768 })
  await page.goto(`${domain}/new/login.aspx`)

  await delaySyncWithConsole(3)

  await page.click('div.login-tab-r')
  await page.type('#loginname', 'your username', { delay: getRandom(60, 130) })
  await page.type('#nloginpwd', 'your password', { delay: getRandom(60, 130) })

  // await page.click('div.login-btn')
}

await slider()

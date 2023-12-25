/**
 * @file 京东滑块
 * @description 2023-12-25
 */

import puppeteer from 'puppeteer'

import { randint, uniform } from 'reverse-shared/random'
import { delay } from 'reverse-shared/tools'

const domain = 'https://passport.jd.com'

// TODO
const get_track = async () => {
  const value = 0
  const distance = (value * 278) / 360
  return distance
}

const slider = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.setViewport({ width: 1366, height: 768 })
  await page.goto(`${domain}/new/login.aspx`)

  await delay()
  await page.click('div#pwd-login')

  await delay()
  await page.type('#loginname', 'your username', { delay: randint(60, 130) })
  await delay()
  await page.type('#nloginpwd', 'your password', { delay: randint(60, 130) })
  await delay()
  await page.click('div.login-btn')

  await delay()
  const image_src = await page.evaluate(() => document.querySelector('.JDJRV-bigimg > img').src)
  const template_src = await page.evaluate(
    () => document.querySelector('.JDJRV-smallimg > img').src
  )

  const distance = await get_track()

  const el = await page.$('div.JDJRV-slide-btn')
  const box = await el.boundingBox()
  await page.hover('div.JDJRV-slide-btn')

  await page.mouse.down()
  await page.mouse.move(box.x + distance + uniform(30, 33), box.y, { steps: 30 })
  await delay()
  await page.mouse.move(box.x + distance + 29, box.y, { steps: 30 })
  await page.mouse.up()
  await delay()
}

await slider()

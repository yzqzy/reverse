/**
 * @file 京东滑块验证
 * @description 2023-12-29
 *  1. 利用 python ddddocr 进行图像识别
 *  2. puppeteer 模拟人工登录
 */

import puppeteer from 'puppeteer'

import { randint, uniform } from 'reverse-shared/random'
import { delay, delaySyncWithConsole } from 'reverse-shared/tools'
import { post } from 'reverse-shared/request'

const domain = 'https://passport.jd.com'

const removePrefix = str => {
  const idx = str.indexOf(',')
  return (idx && str.substring(idx)) || str
}

// use reverse python server
const get_track = async (target_src, background_src) => {
  const response = await post('http://127.0.0.1:5000/slide/match', {
    target_src: removePrefix(target_src),
    background_src: removePrefix(background_src)
  })
  const data = JSON.parse(response.text)
  const distance = data.result.target[0]
  return distance
}

const username = `your username`
const password = `your password`

const slider = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.setViewport({ width: 1366, height: 768 })
  await page.goto(`${domain}/new/login.aspx`)

  await delay()
  await page.click('div#pwd-login')

  await delay()
  await page.type('#loginname', username, { delay: randint(60, 130) })
  await delay()
  await page.type('#nloginpwd', password, { delay: randint(60, 130) })
  await delay()
  await page.click('div.login-btn')

  await delay()
  const image_src = await page.evaluate(() => document.querySelector('.JDJRV-bigimg > img').src)
  const template_src = await page.evaluate(
    () => document.querySelector('.JDJRV-smallimg > img').src
  )

  const distance = await get_track(template_src, image_src)

  const el = await page.$('div.JDJRV-slide-btn')
  const box = await el.boundingBox()
  await page.hover('div.JDJRV-slide-btn')

  await page.mouse.down()
  await page.mouse.move(box.x + distance + uniform(28, 30), box.y, { steps: 30 })
  await delay()
  await page.mouse.move(box.x + distance + 25, box.y, { steps: 30 })
  await page.mouse.up()
  await delay()

  await delaySyncWithConsole(5)
  await page.close()
  await browser.close()
}

await slider()

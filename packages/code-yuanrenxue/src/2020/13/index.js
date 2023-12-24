/**
 * @file 入门级cookie
 * @description
 *  1. 还是抓取这5页的数字，计算加和并提交结果
 *  2. 动态 cookie、用户登录 + js cookie
 * @time 2023-12-13
 */

import puppeteer from 'puppeteer'
import { get } from 'reverse-shared/request'
import { delay, formatParams } from 'reverse-shared/tools'

const domain = 'https://match.yuanrenxue.cn'

const evaluateFn = async () => {
  const username = `your usernmae`
  const password = `your password`

  const login = () => {
    return new Promise(resolve => {
      fetch(`${domain}/api/login`, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `username=${username}&password=${password}`,
        method: 'POST'
      }).then(() => {
        resolve()
      })
    })
  }
  await login()
  return document.cookie
}

const getCookie = async () => {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  await page.goto(`${domain}/match/13`)
  const cookie = await page.evaluate(evaluateFn)
  await browser.close()
  return cookie
}

const match = async (page, cookie) => {
  const url = `${domain}/api/match/13?${formatParams({ page })}`
  const response = await get(url, {
    cookie,
    'User-Agent': 'yuanrenxue.project'
  })
  return JSON.parse(response.text)
}

const addSum = data => data.reduce((pre, cur) => ((pre += cur.value), pre), 0)

let sum = 0

for (let i = 0; i < 5; i++) {
  const res = await match(i + 1, await getCookie())

  if (res.data) {
    sum += addSum(res.data)
    await delay()
    continue
  }

  break
}

console.log(sum)

/**
 * @file js混淆 - 源码乱码
 * @description
 *  1. 抓取所有（5页）机票的价格，并计算所有机票价格的平均值
 *  2. 无限debugger、js混淆
 * @time 2023-12-18
 */

import puppeteer from 'puppeteer'
import { get } from 'reverse-shared/request'
import { delay, formatParams } from 'reverse-shared/tools'
import { evaluateFn } from './helper.js'

const domain = 'https://match.yuanrenxue.cn'

// static
const cookie = 'your cookie'

const genSign = async () => {
  const browser = await puppeteer.launch({ headless: 'new' })
  const newPage = await browser.newPage()

  const _0x2268f9 = Date['parse'](new Date()) + (16798545 + -72936737 + 156138192),
    _0x57feae = await newPage.evaluate(evaluateFn)

  await browser.close()

  return _0x57feae + '丨' + _0x2268f9 / (-1 * 3483 + -9059 + 13542)
}

const match = async page => {
  const url = `${domain}/api/match/1?${formatParams({
    page,
    m: encodeURIComponent(await genSign())
  })}`

  const response = await get(url, {
    cookie,
    'User-Agent': 'yuanrenxue.project'
  })
  return JSON.parse(response.text)
}

const addSum = data => data.reduce((pre, cur) => ((pre += cur.value), pre), 0)

let sum = 0

for (let i = 0; i < 5; i++) {
  const res = await match(i + 1)

  if (res.data) {
    sum += addSum(res.data)
    await delay()
    continue
  }

  break
}

console.log(sum / 50)

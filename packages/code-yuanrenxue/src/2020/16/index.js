/**
 * @file js逆向 - window蜜罐
 * @description
 *  1. 抓取这5页的数字，计算加和并提交结果
 *  2. webpack 初体验、请求加密
 * @time 2023-12-30
 */

import { get } from 'reverse-shared/request'
import { delay, formatParams } from 'reverse-shared/tools'

import { genSign } from './helper.js'

const domain = 'https://match.yuanrenxue.cn'

const cookie = `your cookie`

const match = async page => {
  const p_s = Date.now()
  const url = `${domain}/api/match/16?${formatParams({
    page,
    m: genSign(`${p_s}`),
    t: p_s
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
  console.log('-------------------------------------')

  const res = await match(i + 1)

  if (res.data) {
    sum += addSum(res.data)
    await delay()
    continue
  }

  break
}

console.log(sum)

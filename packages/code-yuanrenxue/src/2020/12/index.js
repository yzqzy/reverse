/**
 * @file 入门级js
 * @description
 *  1. 抓取这5页的数字，计算加和并提交结果
 *  2. 请求参数加密
 * @time 2023-12-13
 */

import { get } from 'reverse-shared/request'
import { delay, formatParams } from 'reverse-shared/tools'

const domain = 'https://match.yuanrenxue.cn'

// static
const cookie = 'your cookie'

const match = async page => {
  const url = `${domain}/api/match/12?${formatParams({
    page,
    m: Buffer.from(`yuanrenxue${page}`).toString('base64')
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

console.log(sum)

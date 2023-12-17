/**
 * @file js混淆源码乱码
 * @description
 *  1. 抓取所有（5页）机票的价格，并计算所有机票价格的平均值
 *  2. 无限debugger、js混淆
 * @time 2023-12-13
 */

import { get } from 'shared/request'
import { delay, formatParams } from 'shared/tools'

const domain = 'https://match.yuanrenxue.cn'

// static
const cookie = 'your cookie'

const genSign = () => {
  var _0x2268f9 = Date['parse'](new Date()) + (16798545 + -72936737 + 156138192),
    _0x57feae = oo0O0(_0x2268f9['toStr' + 'ing']()) + window['f']
  const _0x5d83a3 = {}
  ;(_0x5d83a3['page'] = window['page']),
    (_0x5d83a3['m'] = _0x57feae + '丨' + _0x2268f9 / (-1 * 3483 + -9059 + 13542))
  return _0x2268f9
}

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

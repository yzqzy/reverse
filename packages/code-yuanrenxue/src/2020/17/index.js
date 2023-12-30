/**
 * @file 天杀的Http2.0
 * @description
 *  1. 抓取这5页的数字，计算加和并提交结果
 *  2. http2 请求
 * @time 2023-12-30
 */

import http2 from 'http2'
import { delay } from 'reverse-shared/tools'

const domain = 'https://match.yuanrenxue.cn'

const cookie = 'your cookie'

const match = async page => {
  return new Promise(async resolve => {
    const client = http2.connect(domain)

    const req = client.request({
      ':path': `/api/match/17?page=${page}`,
      'User-Agent': 'yuanrenxue.project',
      cookie
    })

    console.log(`/api/match/17?page=${page}`)

    req.on('response', (headers, flags) => {
      // console.log('Response headers:', headers)
    })

    req.setEncoding('utf8')

    let data = ''
    req.on('data', chunk => {
      data += chunk
    })

    req.on('end', () => {
      // console.log('Response data:', data)
      req.close()

      resolve(JSON.parse(data))
    })

    req.end()
  })
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

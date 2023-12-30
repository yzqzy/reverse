/**
 * @file 访问逻辑 - 推心置腹
 * @description
 *  1. 抓取下列5页商标的数据，并将出现频率最高的申请号填入答案中
 *  2. headers 请求排序，http2
 * @time 2023-12-30
 */

import http2 from 'http2'
import { delay } from 'reverse-shared/tools'

const domain = 'https://match.yuanrenxue.cn'

const cookie = `your cookie`

const headers = {
  'content-length': '0',
  pragma: 'no-cache',
  'cache-control': 'no-cache',
  'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  'sec-ch-ua-mobile': '?0',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'sec-ch-ua-platform': '"macOS"',
  accept: '*/*',
  origin: 'https://match.yuanrenxue.cn',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  referer: 'https://match.yuanrenxue.cn/match/3',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.9',
  cookie
}

const connect = (client, headers) => {
  return new Promise(async resolve => {
    const req = client.request({ ':path': `/jssm`, ...headers })

    req.on('response', (headers, flags) => {
      console.log('Response headers:', headers['set-cookie'])
    })

    req.setEncoding('utf8')

    let data = ''
    req.on('data', chunk => {
      data += chunk
    })

    req.on('end', () => {
      // console.log('Response data:', data)
      resolve()
    })

    req.end()
  })
}

const match = async (client, headers, page) => {
  return new Promise(async resolve => {
    const req = client.request({ ':path': `/api/match/3?page=${page}`, ...headers })

    req.on('response', (headers, flags) => {
      // console.log('Response headers:', headers)
    })

    req.setEncoding('utf8')

    let data = ''
    req.on('data', chunk => {
      data += chunk
    })

    req.on('end', () => {
      console.log('Response data:', data)
      resolve(JSON.parse(data))
    })

    req.end()
  })
}

const findMostFrequentNumber = arr => {
  const frequencyMap = new Map()

  arr.forEach(num => frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1))

  let mostFrequentNumber
  let maxFrequency = 0

  frequencyMap.forEach((frequency, num) => {
    if (frequency > maxFrequency) {
      mostFrequentNumber = num
      maxFrequency = frequency
    }
  })

  return mostFrequentNumber
}

const main = async () => {
  const client = http2.connect(domain)

  const values = []

  for (let i = 0; i < 5; i++) {
    console.log(`${i + 1} ----------------------------------------`)

    await connect(client, headers)

    const res = await match(client, headers, i + 1)

    if (res.data) {
      values.push(...res.data.map(item => item.value))
      await delay()
      continue
    }

    break
  }

  client.close()

  console.log('compute ----------------------------------------')

  console.log(findMostFrequentNumber(values))
}

await main()

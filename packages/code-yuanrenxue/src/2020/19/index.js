/**
 * @file 乌拉乌拉乌拉
 * @description
 *  1. 抓取这5页的数字，计算加和并提交结果
 *  2. tls/ja3 浏览器指纹
 * @time 2023-12-14
 */

import initCycleTLS from 'cycletls'
import { delay, formatParams, parseCookie } from 'reverse-shared/tools'

const domain = 'https://match.yuanrenxue.cn'

const cookie =
  'Hm_lvt_c99546cf032aaa5a679230de9a95c7db=1702508379; qpfccr=true; no-alert3=true; tk=-4012337813119351294; sessionid=rbgcwhfb7xg18wdtdps6tjfe3gg32j12; Hm_lvt_9bcbda9cbf86757998a2339a0437208e=1702508415; Hm_lpvt_9bcbda9cbf86757998a2339a0437208e=1702508415; Hm_lpvt_c99546cf032aaa5a679230de9a95c7db=1702508427'

const match = async page => {
  return new Promise(async resolve => {
    const cycleTLS = await initCycleTLS()
    const response = await cycleTLS(
      `${domain}/api/match/19?${formatParams({ page })}`,
      {
        cookies: parseCookie(cookie),
        body: '',
        ja3: '771,4865-4867-4866-49195-49199-52393-52392-49196-49200-49162-49161-49171-49172-51-57-47-53-10,0-23-65281-10-11-35-16-5-51-43-13-45-28-21,29-23-24-25-256-257,0',
        userAgent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0'
      },
      'get'
    )
    await cycleTLS.exit()
    resolve(response.body)
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

/**
 * @file	访问逻辑 - 推心置腹
 * @description
 *  1. 抓取下列5页商标的数据，并将出现频率最高的申请号填入答案中
 * @time 2023-12-20
 */

import puppeteer from 'puppeteer'
import { get } from 'shared/request'
import { delay, formatParams } from 'shared/tools'

const domain = 'https://match.yuanrenxue.cn'

// static
const cookie = 'your cookie'

const match = async page => {
  const url = `${domain}/api/match/3?${formatParams({ page })}`

  const response = await get(url, {
    cookie,
    'User-Agent': 'yuanrenxue.project'
  })
  return JSON.parse(response.text)
}

for (let i = 0; i < 5; i++) {
  const res = await match(i + 1)
}

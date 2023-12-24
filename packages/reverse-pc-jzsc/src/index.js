/**
 * @file 建筑市场监管平台
 * @description 2023-12-13
 */

import { delay, formatParams } from 'reverse-shared/tools'
import { decodeData } from './decrypt.js'

const domain = 'https://jzsc.mohurd.gov.cn'

const getCompList = async page => {
  return new Promise(resolve => {
    fetch(
      `${domain}/APi/webApi/dataservice/query/comp/list?${formatParams({
        pg: page,
        pgsz: 15
      })}`,
      {
        headers: {
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        },
        method: 'GET'
      }
    )
      .then(res => res.text())
      .then(res => {
        const data = JSON.parse(decodeData(res))
        resolve(data.data.list)
      })
  })
}

for (let i = 0; i < 30; i++) {
  const data = await getCompList(i)
  console.log(i + 1, JSON.stringify(data))
  await delay()
}

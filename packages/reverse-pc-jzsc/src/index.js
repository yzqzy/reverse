/**
 * @file 建筑市场监管平台
 * @description 2023-12-13
 */

import { formatParams } from 'shared/tools'

const domain = 'https://jzsc.mohurd.gov.cn'

const getCompList = async () => {
  return new Promise(resolve => {
    fetch(
      `${domain}/APi/webApi/dataservice/query/comp/list?${formatParams({
        pg: 0,
        pgsz: 15,
        total: 0
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
        console.log(res)
      })
  })
}

const data = await getCompList()
console.log(data)

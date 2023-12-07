// 百度搜索

import { get } from 'shared/request'
import { formatParams } from 'shared/tools'

const url = 'https://www.baidu.com'

const search = async query => {
  const data = await get(
    `${url}/sugrec?${formatParams({
      prod: 'pc',
      from: 'pc_web',
      wd: query
    })}`
  )
  return data.g
}

const response = await search('月落个人博客')

console.log(response)

/**
 * @file 百度搜索
 * @description 2023-12-07
 */

import { get } from 'shared/request'
import { formatParams } from 'shared/tools'

const domain = 'https://www.baidu.com'

// 搜索推荐
const sugrec = async wd => {
  const response = await get(
    `${domain}/sugrec?${formatParams({
      prod: 'pc',
      from: 'pc_web',
      wd
    })}`
  )
  return JSON.parse(response.text)
}

const data = await sugrec('hello')
console.log(data)

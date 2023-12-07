// 百度搜索

import { get } from 'shared/request'
import { formatParams } from 'shared/tools'

const url = 'https://www.baidu.com'

const sugrec = async wd => {
  const data = await get(
    `${url}/sugrec?${formatParams({
      prod: 'pc',
      from: 'pc_web',
      wd
    })}`
  )
  return JSON.parse(data.text)
}

const response = await sugrec('hello')
console.log(response)

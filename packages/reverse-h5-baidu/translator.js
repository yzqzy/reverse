// 百度翻译

import { get } from 'shared/request'
import { formatParams } from 'shared/tools'

const url = 'https://fanyi.baidu.com'

const langdetect = async query => {
  const data = await get(
    `${url}/langdetect?${formatParams({
      query
    })}`
  )
  return JSON.parse(data.text)
}

const language = await langdetect('hello')
console.log(language)

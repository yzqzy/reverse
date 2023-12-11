/**
 * @file 有道翻译
 * @description 2023-12-11
 */

import { formatParams } from 'shared/tools'

import { getTextTranslateResult, decodeData } from './helper.js'

const domain = 'https://dict.youdao.com'

const token = 'your token'
const cookie = 'your cookie'

// 实时翻译
const trans = async (query, from, to) => {
  const params = getTextTranslateResult(token, {
    query,
    from,
    to
  })
  return new Promise(resove => {
    fetch(`${domain}/webtranslate`, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Referer: 'https://fanyi.youdao.com/',
        cookie
      },
      body: formatParams(params),
      method: 'POST'
    })
      .then(res => res.text())
      .then(res => {
        const data = JSON.parse(decodeData(res))
        resove(data.translateResult)
      })
  })
}

const data = await trans('hello world', 'en', 'zh-CHS')
console.log(data)

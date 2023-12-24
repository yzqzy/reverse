/**
 * @file 有道翻译
 * @description 2023-12-12
 */

import { get } from 'reverse-shared/request'
import { formatParams } from 'reverse-shared/tools'

import { getTextTranslateResult, decodeData } from './helper.js'

const domain = 'https://dict.youdao.com'

const cache = { secretKey: '' }

// 获取请求 token
const fetchSecretKey = async () => {
  const o = 'webfanyi-key-getter',
    a = 'asdjnjfenknafdfsdfsd'
  const params = getTextTranslateResult({ keyid: o }, a)

  const response = await get(`${domain}/webtranslate/key?${formatParams(params)}`)
  const { data } = JSON.parse(response.text)

  return data.secretKey
}

const cookie = 'your cookie'

// 实时翻译
const trans = async (query, from, to) => {
  const secretKey = cache.secretKey || (await fetchSecretKey())
  const params = getTextTranslateResult({ query, from, to }, secretKey)

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

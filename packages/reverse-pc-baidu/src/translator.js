/**
 * @file 百度翻译
 * @description 2023-12-09
 */

import { get, post } from 'shared/request'
import { formatParams } from 'shared/tools'

import { window } from './config.js'
import { genSign } from './encrypt.js'

const domain = 'https://fanyi.baidu.com'

// 语言检测
const langdetect = async query => {
  const response = await get(
    `${domain}/langdetect?${formatParams({
      query
    })}`
  )
  return JSON.parse(response.text)
}

// 实时翻译
const trans = async (query, from, to = 'zh') => {
  const url = `${domain}/v2transapi?${formatParams({
    from,
    to
  })}`
  const params = {
    from,
    to,
    query,
    transtype: 'translang',
    simple_means_flag: 3,
    sign: genSign(query),
    domain: 'common',
    ts: Date.now(),
    token: window.common.token
  }
  const headers = {
    cookie: `your cookie`
  }

  const response = await post(url, params, headers)
  const data = JSON.parse(response.text)

  if (data.errmsg) return data
  return data.trans_result.data
}

const queryString = 'hello'

const language = await langdetect(queryString)
console.log(language)

const data = await trans(queryString, language.lan)
console.log(data)

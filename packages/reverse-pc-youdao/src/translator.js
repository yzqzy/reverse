/**
 * @file 有道翻译
 * @description 2023-12-11
 */

import { get, post } from 'shared/request'
import { formatParams } from 'shared/tools'

const domain = 'https://dict.youdao.com'

// 实时翻译
const trans = async query => {
  const response = await post(url, params, headers)
}

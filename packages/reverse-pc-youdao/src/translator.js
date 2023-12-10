/**
 * @file 有道翻译
 * @description 2023-12-09
 */

import { get, post } from 'shared/request'
import { formatParams } from 'shared/tools'

const domain = 'https://dict.youdao.com'

// 实时翻译
const trans = async (query, from, to = 'zh') => {
  
}
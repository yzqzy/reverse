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
  const cookie = `__bid_n=1843d6a4f0dfaa465b4207; FEID=v10-b9613de770b9cabc1e20eaa9cb308f55fdd83b01; __xaf_fpstarttimer__=1671956315728; __xaf_thstime__=1671956315860; __xaf_fptokentimer__=1671956315964; BAIDU_WISE_UID=wapp_1671956488470_787; FPTOKEN=ezPEw2sncD28ImsSo/EdMAIvm5k8gUijAWnjk9IACXgHMdzNWK1lbQv9vkbEOYcdorS80/pYHan2JPqUfpP5Nu8sDRkRMxhee5pzmefel+++E6IghGA9CSfHe9qW7WCpvHBx3dQptHs3+GybtrzLGjG9XqLpVbwscx3qMLgA/83pLrCfDR3ZP6ci4/RvJxen76YrkDuTh8/pQMLtYDJ1QDVF2aHoOmcsmcZoeP6cXl5pXwaft1fBYn8iF+g7HmEgdoqtO0CxdmwmNb/1fCKX+oiyAvNACmlV8FR3yotUMfKMyoqdwRh3zZjeMIitteYQrYaZcR49bljQj3TmHw/6TYCjvf+72Y5jqHb18P1j8R1YB9M4A1VNUMaK/8Rq0tAVAOn/Ixgzx8uaMiLmDpVsOA==|l+AWuRclC/+m2ocoRVLRhWwiCvlrZScYbV/GpnTKyYI=|10|ef308c133c29afdc856f042d48536480; BAIDUID=AF880CF6BFFC5E754114A330001AD7C6:FG=1; BAIDUID_BFESS=AF880CF6BFFC5E754114A330001AD7C6:FG=1; ZFY=wnl08Q01yv9u8dT0xACxDfHNRHJDAiT:AUIkf7t5QU3Y:C; BDUSS=FhKOFp6SWtsRmxzbllDdFhoQ1MxMzU1UmtWbmNWcnJwZTRkM3FBaUxoVzd5M3hqRUFBQUFBJCQAAAAAAAAAAAEAAAA4rzplaG1jbXlsb3ZlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALs-VWO7PlVjZ; BDUSS_BFESS=FhKOFp6SWtsRmxzbllDdFhoQ1MxMzU1UmtWbmNWcnJwZTRkM3FBaUxoVzd5M3hqRUFBQUFBJCQAAAAAAAAAAAEAAAA4rzplaG1jbXlsb3ZlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALs-VWO7PlVjZ; ZD_ENTRY=google; PSTM=1701907909; BA_HECTOR=0l2h25a4a0240ha40125ah8l1in23mf1q; BIDUPSID=7B39C7274807FD4EEEFFAB9AE5EC52B1; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; PSINO=2; H_PS_PSSID=39713_39733_39704_39796_39680_39679_39817_39837_39781_39842_39904_39909_39935_39936_39932; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1701953571; delPer=0; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1701958057`

  const response = await post(url, params, { cookie })
  const data = JSON.parse(response.text)

  if (data.errmsg) return data
  return data.trans_result.data
}

const queryString = 'hello'

const language = await langdetect(queryString)
console.log(language)

const data = await trans(queryString, language.lan)
console.log(data)

import buffer from 'buffer'
import crypto from 'crypto'

const decodeKey =
  'ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl'
const decodeIv =
  'ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4'

const u = 'fanyideskweb',
  d = 'webfanyi',
  m = 'client,mysticTime,product',
  p = '1.0.0',
  g = 'web',
  b = 'fanyi.web',
  A = 1,
  h = 1,
  f = 1,
  v = 'wifi',
  O = 0

function j(e) {
  return crypto.createHash('md5').update(e.toString()).digest('hex')
}

function k(e, t) {
  return j(`client=${u}&mysticTime=${e}&product=${d}&key=${t}`)
}

function E(e, t) {
  const o = new Date().getTime()
  return {
    sign: k(o, e),
    client: u,
    product: d,
    appVersion: p,
    vendor: g,
    pointParam: m,
    mysticTime: o,
    keyfrom: b,
    mid: A,
    screen: h,
    model: f,
    network: v,
    abtest: O,
    yduuid: t || 'abcdefg'
  }
}

function y(e) {
  return crypto.createHash('md5').update(e).digest()
}

export const getTextTranslateResult = str => {
  const e = {
    dictResult: true,
    domain: '0',
    from: 'auto',
    i: str,
    keyid: 'webfanyi',
    to: ''
  }
  return {
    ...e,
    ...E(e)
  }
}

export const decodeData = (t, o = decodeKey, n = decodeIv) => {
  if (!t) return null
  const a = buffer.Buffer.alloc(16, y(o)),
    i = buffer.Buffer.alloc(16, y(n)),
    r = crypto.createDecipheriv('aes-128-cbc', a, i)
  let s = r.update(t, 'base64', 'utf-8')
  return (s += r.final('utf-8')), s
}

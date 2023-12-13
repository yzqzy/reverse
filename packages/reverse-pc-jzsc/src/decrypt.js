import crypto from 'crypto-js'

const f = crypto.enc.Utf8.parse('jo8j9wGw%6HbxfFn')
const m = crypto.enc.Utf8.parse('0123456789ABCDEF')

export function decodeData(t) {
  var e = crypto.enc.Hex.parse(t),
    n = crypto.enc.Base64.stringify(e),
    a = crypto.AES.decrypt(n, f, {
      iv: m,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7
    }),
    r = a.toString(crypto.enc.Utf8)
  return r.toString()
}

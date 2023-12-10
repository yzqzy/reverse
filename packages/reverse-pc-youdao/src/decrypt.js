import { Buffer } from 'buffer/index.js'

const decodeKey =
  'ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl'
const decodeIv =
  'ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4'

export const decodeData = (t, o = decodeKey, n = decodeIv) => {
  if (!t) return null
  const a = Buffer.alloc(16, y(o)),
    i = Buffer.alloc(16, y(n)),
    r = c.a.createDecipheriv('aes-128-cbc', a, i)
  let s = r.update(t, 'base64', 'utf-8')
  return (s += r.final('utf-8')), s
}

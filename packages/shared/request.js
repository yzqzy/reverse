import superagent from 'superagent'

const parse = str => JSON.parse(str)

export const get = async (url, headers = {}) => {
  const promise = superagent.get(url)

  for (const k of Object.keys(headers)) promise.set(k, headers[k])

  promise.timeout({
    response: 5 * 1000,
    deadline: 60 * 1000
  })

  return parse((await promise).text)
}

export const post = async (url, data, headers = {}) => {
  const promise = superagent.post(url).send(data)

  for (const k of Object.keys(headers)) promise.set(k, headers[k])

  promise.timeout({
    response: 10000,
    deadline: 60000
  })

  return parse((await promise).data)
}

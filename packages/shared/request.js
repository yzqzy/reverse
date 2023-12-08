import superagent from 'superagent'

const injectHeaders = (promise, headers = {}) => {
  for (const k of Object.keys(headers)) promise.set(k, headers[k])
}
const injectTimeout = promise => {
  promise.timeout({ response: 5 * 1000, deadline: 60 * 1000 })
}
const inject = (promise, headers) => {
  injectTimeout(promise)
  injectHeaders(promise, headers)
}

export const get = (url, headers = {}) => {
  const promise = superagent.get(url)
  inject(promise, headers)
  return promise
}
export const post = (url, data, headers = {}) => {
  const promise = superagent.post(url).send(data)
  inject(url, headers)
  return promise
}

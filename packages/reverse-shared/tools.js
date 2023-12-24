export * from './cookie.js'
export * from './random.js'

export const jsonFormatted = obj => JSON.stringify(obj, null, 2)

export const formatParams = params => {
  let result = ''
  for (const key of Object.keys(params)) {
    result += `${key}=${params[key]}&`
  }
  return result.slice(0, -1)
}

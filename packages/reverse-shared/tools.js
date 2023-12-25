export * from './cookie.js'
export * from './random.js'

import { randint } from './random.js'

export const delaySync = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

export const delaySyncWithConsole = async (s = 60) => {
  while (s) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(`countdown: ${s--}`)
  }
}
export const delay = async (start = 3, end = 15) => {
  const delay = randint(start, end) * 100

  console.log('delay', `${delay}ms`)

  await delaySync(delay)
}

export const jsonFormatted = obj => JSON.stringify(obj, null, 2)

export const formatParams = params => {
  let result = ''
  for (const key of Object.keys(params)) {
    result += `${key}=${params[key]}&`
  }
  return result.slice(0, -1)
}

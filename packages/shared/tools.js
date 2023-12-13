const getRandom = (start, end) => Math.floor(Math.random() * (end - start + 1) + start)

const delaySync = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

export const delaySyncWithConsole = async (ms = 60) => {
  while (ms) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(`countdown: ${ms--}`)
  }
}
export const delay = async (start = 3, end = 15) => {
  const delay = getRandom(start, end) * 100

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

export const parseCookie = cookieString => {
  const cookieArray = cookieString.split(';')
  const cookieObject = {}
  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=').map(part => part.trim())
    cookieObject[key] = value
  })
  return cookieObject
}

export const getRandom = (start, end) => Math.floor(Math.random() * (end - start + 1) + start)

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
  const delay = getRandom(start, end) * 100

  console.log('delay', `${delay}ms`)

  await delaySync(delay)
}

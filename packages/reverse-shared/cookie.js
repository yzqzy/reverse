export const parseCookie = cookieString => {
  const cookieArray = cookieString.split(';')
  const cookieObject = {}
  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=').map(part => part.trim())
    cookieObject[key] = value
  })
  return cookieObject
}

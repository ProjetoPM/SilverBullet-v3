export const parseJwt = (text?: string | null) => {
  if (!text) return null

  const base64Url = text.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  )
  return JSON.parse(jsonPayload)
}

export const isTokenExpired = (token?: string | null) => {
  const exp = new Date(parseJwt(token) * 1000)
  const now = new Date()
  return exp < now
}

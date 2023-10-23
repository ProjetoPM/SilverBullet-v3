import i18next, { TOptions } from 'i18next'

export const t = (key: string, options?: TOptions) => {
  return () => i18next.t(key, { ns: 'menu', ...options })
}

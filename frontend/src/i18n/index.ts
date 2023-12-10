import i18next from 'i18next'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { z } from 'zod'
import { makeZodI18nMap } from 'zod-i18n-map'
import { languageDetector } from './language-detector'
import { zod } from './zod'

export type Lang = 'en-US' | 'pt-BR'
export const langs: Array<Lang> = ['en-US', 'pt-BR']

const LOAD_PATH =
  import.meta.env.VITE_PRODUCTION === 'false'
    ? '/src/locales/{{lng}}/{{ns}}.json'
    : '/dist/public/locales/{{lng}}/{{ns}}.json'

if (!LOAD_PATH) {
  throw new Error('LOAD_PATH_I18N not found. Check .env file.')
}

const i18n = i18next
  .use(HttpBackend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    partialBundledLanguages: true,
    fallbackLng: 'pt-BR',
    ns: ['default', 'errors'],
    defaultNS: 'default',
    supportedLngs: langs,
    backend: {
      loadPath: LOAD_PATH
    },
    resources: zod
  })

z.setErrorMap(makeZodI18nMap({ ns: ['zod', 'custom'] }))

export default i18n

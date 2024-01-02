import i18next from 'i18next'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { z } from 'zod'
import { makeZodI18nMap } from 'zod-i18n-map'
import { languageDetector } from './language-detector'
import { zod } from './zod'
import { configs } from '@/configs'

export type Lang = 'en' | 'pt'
export const langs: Array<Lang> = ['en', 'pt']

const i18n = i18next
  .use(HttpBackend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    partialBundledLanguages: true,
    fallbackLng: 'pt',
    ns: ['default', 'errors'],
    defaultNS: 'default',
    supportedLngs: langs,
    backend: {
      loadPath: configs.i18n.loadPath,
    },
    resources: zod
  })

z.setErrorMap(makeZodI18nMap({ ns: ['zod', 'custom'] }))

export default i18n

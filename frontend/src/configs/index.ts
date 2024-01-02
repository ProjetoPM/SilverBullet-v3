export const configs = {
  debugTable: import.meta.env.VITE_DEBUG_DATA_TABLE === 'true',
  i18n: {
    loadPath:
      import.meta.env.VITE_PRODUCTION === 'true'
        ? 'locales/{{lng}}/{{ns}}.json'
        : '/src/locales/{{lng}}/{{ns}}.json'
  }
}

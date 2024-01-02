export const configs = {
  debugTable: import.meta.env.VITE_DEBUG_DATA_TABLE === 'true',
  i18n: {
    loadPath: import.meta.env.PROD
      ? import.meta.env.VITE_LOAD_PATH_I18N_PROD
      : import.meta.env.VITE_LOAD_PATH_I18N_DEV
  }
}

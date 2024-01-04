import i18next from 'i18next'

/**
 * Formatar uma data para um formato específico.
 *
 * @param date a data a ser formatada.
 * @returns a data formatada.
 */
export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
) => {
  if (!date) return

  let formattedDate: Date

  if (typeof date === 'string') {
    formattedDate = new Date(date)
  } else {
    formattedDate = date
  }

  return new Intl.DateTimeFormat(i18next.language, {
    dateStyle: 'medium',
    ...options
  }).format(formattedDate)
}

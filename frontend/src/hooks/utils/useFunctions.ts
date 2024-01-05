import i18next from 'i18next'
import { useCallback } from 'react'

type As = 'price' | 'date' | 'number'

export const useFunctions = () => {
  const handlePrice = useCallback(
    (price?: string | number, options?: Intl.NumberFormatOptions) => {
      if (!price) return new Intl.NumberFormat(i18next.language).format(0)
      return new Intl.NumberFormat(i18next.language, options).format(
        Number.isNaN(price) ? 0 : +price
      )
    },
    []
  )

  const handleDate = useCallback(
    (date: string, options?: Intl.DateTimeFormatOptions) => {
      return new Intl.DateTimeFormat(i18next.language, {
        dateStyle: 'medium',
        ...options
      }).format(new Date(date))
    },
    []
  )

  const handleNumber = useCallback(
    (number: string | number, options?: Intl.NumberFormatOptions) => {
      return new Intl.NumberFormat(i18next.language, options).format(
        Number.isNaN(number) ? 0 : +number
      )
    },
    []
  )

  const handle = useCallback(
    (as?: As) => {
      const functions = {
        price: handlePrice,
        date: handleDate,
        number: handleNumber,
        text: (text: string) => text
      }

      return functions[as || 'text']
    },
    [handlePrice, handleDate, handleNumber]
  )

  return {
    handlePrice,
    handleDate,
    handleNumber,
    handle
  }
}

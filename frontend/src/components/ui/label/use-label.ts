import { tv } from '@nextui-org/react'
import i18next from 'i18next'
import { useCallback } from 'react'

export const useLabel = () => {
  const text = tv({
    base: "block font-medium will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none data-[required=true]:after:content-['*'] data-[required=true]:after:ml-0.5 after:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-md data-[prepend=true]:before:mr-0.5 data-[append=true]:after:ml-0.5 data-[with-padding=true]:pb-1.5 data-[is-invalid=true]:!text-danger",
    variants: {
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        danger: 'text-danger',
        success: 'text-success',
        warning: 'text-warning',
        foreground: 'text-foreground'
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
      }
    },
    defaultVariants: {
      size: 'md',
      color: 'foreground'
    }
  })

  const handlePrice = useCallback(
    (price?: string, options?: Intl.NumberFormatOptions) => {
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
    (number: string, options?: Intl.NumberFormatOptions) => {
      return new Intl.NumberFormat(i18next.language, options).format(
        Number.isNaN(number) ? 0 : +number
      )
    },
    []
  )

  return { text, handlePrice, handleDate, handleNumber }
}

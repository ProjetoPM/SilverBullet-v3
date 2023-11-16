import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import { FormatDate } from './FormatDate'
import { FormatPrice } from './FormatPrice'

type TextProps = Omit<ComponentProps<'span'>, 'ref'> & {
  isRequired?: boolean
  format?: {
    as: 'price' | 'date'
    text: string
    options?: {
      date?: Intl.DateTimeFormatOptions
      price?: Intl.NumberFormatOptions
    }
  }
  size?: 'xs' | 'sm' | 'md' | 'lg'
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div' | 'p'
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
  isInvalid?: boolean
  withPadding?: boolean
}

export const Text = ({
  isRequired,
  format,
  className,
  size = 'md',
  as = 'span',
  withPadding = false,
  isInvalid = false,
  color,
  ...props
}: TextProps) => {
  const Component = as ?? 'span'

  return (
    <Component
      className={cn(
        "block text-small font-medium text-foreground will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none data-[required=true]:after:content-['*'] data-[required=true]:after:ml-0.5 after:text-danger",
        {
          'text-xs': size === 'xs',
          'text-sm': size === 'sm',
          'text-base': size === 'md',
          'text-lg': size === 'lg',
          'pb-1.5': withPadding
        },
        {
          'text-primary': color === 'primary',
          'text-secondary': color === 'secondary',
          'text-danger': color === 'danger',
          'text-success': color === 'success',
          'text-warning': color === 'warning'
        },
        {
          'text-danger': isInvalid
        },
        className
      )}
      data-required={isRequired}
      {...props}
    >
      {format?.as === 'price' && (
        <FormatPrice toFormat={format.text} {...format.options?.price} />
      )}
      {format?.as === 'date' && (
        <FormatDate date={format.text} {...format.options?.date} />
      )}
      {!format && props.children}
    </Component>
  )
}

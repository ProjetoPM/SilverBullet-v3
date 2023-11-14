import { ComponentProps } from 'react'
import { FormatDate } from './FormatDate'
import { FormatPrice } from './FormatPrice'
import { cn } from '@/lib/utils'

type TextProps = Omit<ComponentProps<'span'>, 'ref'> & {
  text: string
  isRequired?: boolean
  type?: 'price' | 'date'
  options?: {
    date?: Intl.DateTimeFormatOptions
    price?: Intl.NumberFormatOptions
  }
  size?: 'xs' | 'sm' | 'md' | 'lg'
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div'
}

export const Text = ({
  text,
  isRequired,
  type,
  options,
  className,
  size = 'md',
  as = 'span',
  ...props
}: TextProps) => {
  const Component = as ?? 'span'

  return (
    <Component
      className={cn(
        "block text-small font-medium text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none data-[required=true]:after:content-['*'] data-[required=true]:after:ml-0.5 after:text-danger",
        {
          'text-xs': size === 'xs',
          'text-sm': size === 'sm',
          'text-base': size === 'md',
          'text-lg': size === 'lg'
        },
        className
      )}
      data-required={isRequired}
      {...props}
    >
      {type === 'price' && <FormatPrice toFormat={text} {...options?.price} />}
      {type === 'date' && <FormatDate date={text} {...options?.date} />}
      {!type && text}
    </Component>
  )
}

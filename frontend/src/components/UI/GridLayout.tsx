import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type GridProps = ComponentProps<'div'> & {
  children: React.ReactNode
  cols?: '1' | '2' | '3' | '4'
  sx?: string
}

export const GridLayout = ({
  children,
  cols,
  className,
  sx,
  ...props
}: GridProps) => {
  if (cols && className) {
    throw new Error(
      'GridLayout: className and cols cannot be used together. Please use only one of them. If you want to style, use sx instead.'
    )
  }

  const _cols = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <div
      className={cn('grid gap-3', cols ? _cols[cols] : className, sx)}
      {...props}
    >
      {children}
    </div>
  )
}

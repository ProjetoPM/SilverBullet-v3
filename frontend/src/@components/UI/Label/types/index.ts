import { PressEvent } from 'react-aria'

export type TextSize = 'xs' | 'sm' | 'md' | 'lg'
export type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'foreground'

export type TextBaseProps = {
  isRequired?: boolean
  prepend?: React.ReactNode
  append?: React.ReactNode
  size?: TextSize
  as?: TextAs
  color?: TextColor
  isInvalid?: boolean
  withPadding?: boolean
  onPress?: (e: PressEvent) => void
  children?: React.ReactNode
  format?: {
    as: 'price' | 'date' | 'number'
    text: string
    options?: {
      date?: Intl.DateTimeFormatOptions
      price?: Intl.NumberFormatOptions
      number?: Intl.NumberFormatOptions
    }
  }
}

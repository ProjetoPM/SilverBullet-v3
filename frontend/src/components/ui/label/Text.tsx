import { ComponentPropsWithRef } from 'react'
import { usePress } from 'react-aria'
import { TextAs, TextBaseProps } from './types'
import { useLabel } from './use-label'

type TextProps<T extends TextAs> = ComponentPropsWithRef<T> & TextBaseProps

export const Text = <T extends TextAs>({
  children,
  ...props
}: TextProps<T>) => {
  const {
    as,
    size,
    color,
    className,
    isRequired,
    prepend,
    append,
    withPadding,
    isInvalid,
    onPress,
    format,
    ...rest
  } = props
  const { text, handleDate, handleNumber, handlePrice } = useLabel()
  const { pressProps } = usePress({ onPress })
  const Component = as || 'p'

  return (
    <Component
      {...(onPress ? pressProps : {})}
      className={text({ size, color, className })}
      data-required={isRequired}
      data-prepend={prepend}
      data-append={append}
      data-with-padding={withPadding}
      data-is-invalid={isInvalid}
      role={onPress ? 'button' : undefined}
      tabIndex={onPress ? 0 : -1}
      {...rest}
    >
      {prepend}
      {format?.as === 'date' && handleDate(format.text, format.options?.date)}
      {format?.as === 'number' && handleNumber(format.text)}
      {format?.as === 'price' && handlePrice(format.text)}
      {!format && children}
      {append}
    </Component>
  )
}

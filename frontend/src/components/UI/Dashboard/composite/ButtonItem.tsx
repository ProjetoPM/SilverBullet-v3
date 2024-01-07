import { ComponentProps } from 'react'
import { PressEvent, usePress } from 'react-aria'

type ButtonItem = ComponentProps<'button'> & {
  onPress?: (e: PressEvent) => void
}

export const ButtonItem = ({ onPress, ...props }: ButtonItem) => {
  const { pressProps } = usePress({ onPress })

  return (
    <button
      type="button"
      className="cursor-pointer rounded-md transition-transform-background motion-reduce:transition-none hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-md select-none"
      {...props}
      {...pressProps}
    />
  )
}

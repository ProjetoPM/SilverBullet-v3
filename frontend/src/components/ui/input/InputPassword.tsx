import { Input, InputProps } from '@nextui-org/react'
import { useId, useState } from 'react'
import { TogglePasswordButton } from './TogglePasswordButton'

type InputPasswordProps = InputProps & {
  icons?: {
    visible: React.ReactNode
    hidden: React.ReactNode
  }
}

export const InputPassword = ({ icons, ...props }: InputPasswordProps) => {
  const id = useId()
  const [isVisible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible((previous) => !previous)
  }

  return (
    <Input
      id={`${id}-input-password`}
      placeholder={'••••••••'}
      type={isVisible ? 'text' : 'password'}
      autoComplete="current-password"
      classNames={{ inputWrapper: 'pr-1' }}
      endContent={
        <TogglePasswordButton
          id={`${id}-toggle-password`}
          isVisible={isVisible}
          onPress={toggleVisibility}
          icons={icons}
        />
      }
      {...props}
    />
  )
}

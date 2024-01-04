import { Input, InputProps as InputNextUIProps } from '@nextui-org/react'
import { forwardRef } from 'react'
import { useFormField } from './Form'

type InputProps = InputNextUIProps & {
  isControlled?: boolean
}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ value, isControlled = false, ...props }, ref) => {
    const { error } = useFormField()
    return (
      <Input
        type="text"
        labelPlacement="outside"
        defaultValue={!isControlled ? value : undefined}
        value={isControlled ? value : undefined}
        errorMessage={error ? String(error?.message) : props.errorMessage}
        classNames={{ clearButton: 'text-foreground-500' }}
        {...props}
        ref={ref}
      />
    )
  }
)

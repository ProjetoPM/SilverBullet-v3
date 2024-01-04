import { Input, InputProps as InputNextUIProps } from '@nextui-org/react'
import { Slot } from '@radix-ui/react-slot'
import {
  ComponentPropsWithoutRef,
  ElementRef,
  createContext,
  forwardRef,
  useContext
} from 'react'
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext
} from 'react-hook-form'

export const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

export const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error } = useFormField()
  return <Slot ref={ref} aria-invalid={!!error} {...props} />
})

type InputProps = InputNextUIProps & {
  isControlled?: boolean
}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ value, isControlled = false, ...props }, ref) => {
    const { error } = useFormField()

    return (
      <FormControl>
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
      </FormControl>
    )
  }
)

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const { getFieldState, formState } = useFormContext()
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  return {
    name: fieldContext.name,
    ...fieldState
  }
}

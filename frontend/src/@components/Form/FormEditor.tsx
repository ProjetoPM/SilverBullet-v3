import { forwardRef } from 'react'
import RichEditor, { RichEditorProps } from '../UI/RichEditor/RichEditor'
import { useFormField } from './Form'

export const FormEditor = forwardRef<
  HTMLInputElement,
  RichEditorProps<unknown>
>(({ errorMessage, ...props }, ref) => {
  const { error } = useFormField()
  return (
    <RichEditor
      {...props}
      errorMessage={error ? String(error?.message) : errorMessage}
      ref={ref}
    />
  )
})

import { forwardRef } from 'react'
import RichEditor, { RichEditorProps } from '../UI/RichEditor/RichEditor'
import { useFormField } from './Form'

export const FormEditor = forwardRef<
  HTMLInputElement,
  RichEditorProps<unknown>
>((props, ref) => {
  const { error } = useFormField()
  return <RichEditor errorMessage={error?.message} {...props} ref={ref} />
})

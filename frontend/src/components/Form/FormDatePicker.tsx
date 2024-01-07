import DatePicker, { DatePickerProps } from '../UI/DatePicker'
import { useFormField } from './Form'

export const FormDatePicker = (props: DatePickerProps) => {
  const { error } = useFormField()
  return <DatePicker errorMessage={error?.message} {...props} />
}

import { cn } from '@/lib/utils'

export type DatePickerMessageProps = {
  id?: string
  description?: string
  errorMessage?: string
}

export const DatePickerMessage = ({
  id,
  errorMessage,
  description
}: DatePickerMessageProps) => {
  if (!errorMessage && !description) {
    return null
  }

  return (
    <p
      id={`${id}-datepicker-message`}
      className={cn('pt-1 px-1 text-tiny select-none', {
        'text-danger': errorMessage,
        'text-foreground-500': !errorMessage
      })}
    >
      {errorMessage ?? description}
    </p>
  )
}

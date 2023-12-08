import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export type DatePickerLabelProps = Omit<ComponentProps<'label'>, 'id'> & {
  id: string
  label?: string
  isRequired?: boolean
}

export const DatePickerLabel = ({
  id,
  label,
  isRequired,
  className
}: DatePickerLabelProps) => {
  if (!label) {
    return null
  }

  return (
    <label
      htmlFor={`${id}-datepicker-label`}
      className={cn(
        "block text-small font-medium text-foreground pb-[0.25rem] will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none data-[required=true]:after:content-['*'] data-[required=true]:after:ml-0.5 after:text-danger",
        className
      )}
      data-required={isRequired}
    >
      {label}
    </label>
  )
}

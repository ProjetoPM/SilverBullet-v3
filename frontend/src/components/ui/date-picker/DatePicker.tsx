import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
  useDisclosure
} from '@nextui-org/react'
import enUS from 'date-fns/locale/en-US'
import ptBR from 'date-fns/locale/pt-BR'
import i18next from 'i18next'
import { CalendarIcon } from 'lucide-react'
import { useId } from 'react'
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import { Calendar, CalendarProps } from './Calendar'

type DatePickerProps<
  T extends FieldValues,
  K extends FieldPath<T>
> = CalendarProps & {
  field: ControllerRenderProps<T, K>
  label?: string
  icon?: React.ReactNode
  placeholder?: string
  isRequired?: boolean
  dateStyle?: 'short' | 'medium' | 'long'
  description?: string
  errorMessage?: string
  shouldCloseOnSelect?: boolean
  shouldDisableAfterToday?: boolean
  buttonProps?: React.ComponentProps<typeof Button>
  classNames?: {
    label?: string
    button?: string
  }
}

export const DatePicker = <T extends FieldValues, K extends FieldPath<T>>({
  field,
  placeholder,
  label,
  classNames,
  isRequired,
  description,
  errorMessage,
  buttonProps,
  dateStyle = 'medium',
  shouldCloseOnSelect = false,
  shouldDisableAfterToday = false,
  icon = <CalendarIcon className="h-4 w-4 opacity-50" />,
  ...props
}: DatePickerProps<T, K>) => {
  const id = useId()
  const { isOpen, onClose, onOpenChange } = useDisclosure()

  const formatDate = (
    date: string | Date,
    options?: Intl.DateTimeFormatOptions
  ) => {
    if (typeof date === 'string') {
      date = new Date(date)
    }

    return new Intl.DateTimeFormat(i18next.language, {
      dateStyle: 'medium',
      ...options
    }).format(date)
  }

  return (
    <div>
      {!!label && (
        <label
          htmlFor={id}
          className={cn(
            "block text-small font-medium text-foreground pb-[0.25rem] will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none data-[required=true]:after:content-['*'] data-[required=true]:after:ml-0.5 after:text-danger",
            classNames?.label
          )}
          data-required={isRequired}
        >
          {label}
        </label>
      )}
      <Popover
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        triggerScaleOnOpen={false}
      >
        <PopoverTrigger>
          <Button
            id={id}
            className={cn(
              'w-full justify-between px-3 text-left font-normal bg-default-100 hover:bg-default-200',
              classNames?.button
            )}
            {...buttonProps}
          >
            <span
              className={cn('outline-none', {
                'line-clamp-1': field.value,
                'outline-none text-foreground-500': !field.value
              })}
            >
              {field.value && formatDate(field.value, { dateStyle })}
              {(!field.value && placeholder) ?? String('Pick a date')}
            </span>
            {icon}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            locale={i18next.language === 'en-US' ? enUS : ptBR}
            {...props}
            mode="single"
            selected={field.value}
            onSelect={(value) => {
              field.onChange(value)

              if (shouldCloseOnSelect) {
                onClose()
              }
            }}
            disabled={
              shouldDisableAfterToday
                ? (date) => date > new Date() || date < new Date('1900-01-01')
                : undefined
            }
          />
        </PopoverContent>
      </Popover>
      {(errorMessage || description) && (
        <p
          className={cn('pt-1 px-1 text-tiny select-none', {
            'text-danger': errorMessage,
            'text-foreground-500': !errorMessage
          })}
        >
          {errorMessage ?? description}
        </p>
      )}
    </div>
  )
}

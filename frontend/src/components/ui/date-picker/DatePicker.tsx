import { Popover, PopoverContent, useDisclosure } from '@nextui-org/react'
import enUS from 'date-fns/locale/en-US'
import ptBR from 'date-fns/locale/pt-BR'
import i18next from 'i18next'
import { useId } from 'react'
import { Calendar, CalendarProps } from './Calendar'
import { DatePickerButton, DatePickerButtonProps } from './DatePickerButton'
import { DatePickerLabel, DatePickerLabelProps } from './DatePickerLabel'
import { DatePickerMessage, DatePickerMessageProps } from './DatePickerMessage'

type DatePickerProps = CalendarProps & {
  label?: string
  isRequired?: boolean
  shouldCloseOnSelect?: boolean
  shouldDisableAfterToday?: boolean
  buttonProps?: Omit<DatePickerButtonProps, 'id'>
  messageProps?: Omit<DatePickerMessageProps, 'id'>
  labelProps?: Omit<DatePickerLabelProps, 'id' | 'label' | 'isRequired'>
}

export const DatePicker = ({
  label,
  isRequired,
  buttonProps,
  messageProps,
  labelProps,
  shouldDisableAfterToday = false,
  shouldCloseOnSelect = false,
  ...props
}: DatePickerProps) => {
  const id = useId()
  const { isOpen, onClose, onOpenChange } = useDisclosure()

  return (
    <div>
      <DatePickerLabel
        id={id}
        label={label}
        isRequired={isRequired}
        {...labelProps}
      />
      <Popover
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        triggerScaleOnOpen={false}
      >
        <DatePickerButton id={id} selected={props.selected} {...buttonProps} />
        <PopoverContent className="p-0">
          <Calendar
            locale={i18next.language === 'en-US' ? enUS : ptBR}
            onDayClick={shouldCloseOnSelect ? onClose : undefined}
            disabled={
              shouldDisableAfterToday
                ? (date) => date > new Date() || date < new Date('1900-01-01')
                : undefined
            }
            initialFocus
            {...props}
          />
        </PopoverContent>
      </Popover>
      <DatePickerMessage id={id} {...messageProps} />
    </div>
  )
}

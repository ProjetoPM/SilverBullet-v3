import { Input, InputProps, cn } from '@nextui-org/react'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

type DebouncedInputProps = Omit<InputProps, 'onChange'> & {
  value: string
  onChange: (value: string) => void
  debounce?: number
}

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}: DebouncedInputProps) => {
  const [isLoading, setLoading] = useState(false)
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    setLoading(true)

    const timeout = setTimeout(() => {
      onChange(value)
      setLoading(false)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
      endContent={
        isLoading && (
          <Loader2 className="w-4 h-4 animate-spin text-foreground bg-default-100 z-10" />
        )
      }
      classNames={{
        inputWrapper: cn('flex-grow w-full h-fit'),
        input: 'w-full min-w-96 lg:w-72'
      }}
      {...props}
    />
  )
}

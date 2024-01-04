import { cn } from '@/lib/utils'
import { strengthColor, strengthIndicator } from '@/utils/password-checker'
import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

type PasswordCheckerProps = ComponentProps<'div'> & {
  password: string
}

const PasswordChecker = ({
  password,
  className,
  ...props
}: PasswordCheckerProps) => {
  const { t } = useTranslation('auth')
  const strength = strengthIndicator(password)
  const color = strengthColor(strength)

  return (
    <div className={cn('flex items-center gap-3', className)} {...props}>
      <span className={cn('h-2 w-10 rounded-full', color.color)} />
      <label className="text-xs">{t(color.label)}</label>
    </div>
  )
}

export { PasswordChecker }

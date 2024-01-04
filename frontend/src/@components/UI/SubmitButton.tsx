import { Button, ButtonProps, cn } from '@nextui-org/react'
import { Edit, RotateCcw, Save } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type SubmitButtonProps = ButtonProps & {
  children?: React.ReactNode
  isEdit?: boolean
  labelResetButton?: string
  fnResetButton?: () => void
}

export const SubmitButton = ({
  children,
  labelResetButton,
  fnResetButton,
  isEdit = false,
  className,
  ...props
}: SubmitButtonProps) => {
  const { t } = useTranslation('default')

  return (
    <div className={cn('flex gap-2.5 mt-2.5', className)}>
      <Button color="primary" type="submit" {...props}>
        {!children && isEdit ? (
          <Edit className="w-5 h-5" />
        ) : (
          <Save className="w-5 h-5" />
        )}
        {!children && isEdit ? t('default:btn.edit') : t('default:btn.save')}
        {children}
      </Button>
      {fnResetButton && (
        <Button
          type="button"
          className="bg-default-100 hover:bg-default-200"
          onPress={() => fnResetButton()}
        >
          <RotateCcw className="w-5 h-5" />
          {labelResetButton || t('default:btn.reset')}
        </Button>
      )}
    </div>
  )
}

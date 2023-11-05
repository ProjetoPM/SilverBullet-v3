import { Button, ButtonProps } from '@nextui-org/react'
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
  ...props
}: SubmitButtonProps) => {
  const { t } = useTranslation('default')

  return (
    <div className="flex gap-2.5 mt-2.5">
      <Button color="primary" type="submit" {...props}>
        {!children && isEdit ? <Edit className="w-5 h-5" /> : <Save />}
        {!children && isEdit ? t('default:btn.edit') : t('default:btn.save')}
        {children}
      </Button>
      {fnResetButton && (
        <Button
          type="button"
          className="bg-default-100 hover:bg-default-200"
          onClick={() => fnResetButton()}
        >
          <RotateCcw className="w-5 h-5" />
          {labelResetButton || t('default:btn.reset')}
        </Button>
      )}
    </div>
  )
}

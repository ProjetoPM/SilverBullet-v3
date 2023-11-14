import { Button, Tooltip } from '@nextui-org/react'
import { Check, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const NotificationActions = () => {
  const { t } = useTranslation('notifications')

  return (
    <div className="flex gap-1">
      <Tooltip content={t('tooltip.accept')} color="success" size="sm">
        <Button color="success" variant="flat" radius="lg" size="sm" isIconOnly>
          <Check className="w-5 h-5" />
        </Button>
      </Tooltip>
      <Tooltip content={t('tooltip.decline')} color="danger" size="sm">
        <Button color="danger" variant="flat" radius="lg" size="sm" isIconOnly>
          <X className="w-5 h-5" />
        </Button>
      </Tooltip>
    </div>
  )
}

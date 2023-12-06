import { frontend } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const WeeklyEvaluationToolbar = () => {
  const { t } = useTranslation('weekly-evaluation')

  return (
    <div className="flex gap-2">
      <Button
        color="primary"
        endContent={<PlusIcon />}
        as={Link}
        href={frontend.weekly_evaluation.new}
      >
        {t('page.new')}
      </Button>
    </div>
  )
}

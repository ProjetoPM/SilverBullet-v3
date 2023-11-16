import { frontend } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const WeeklyReportToolbar = () => {
  const { t } = useTranslation('weekly-report')

  return (
    <div className="flex gap-2">
      <Button
        color="primary"
        endContent={<PlusIcon />}
        as={Link}
        href={frontend.weekly_report.new}
      >
        {t('page.new')}
      </Button>
    </div>
  )
}

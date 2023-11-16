import { frontend } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const ProjectToolbar = () => {
  const { t } = useTranslation('projects')

  return (
    <div className="flex gap-2">
      <Button
        color="primary"
        endContent={<PlusIcon />}
        as={Link}
        href={frontend.projects.new}
      >
        {t('page.new')}
      </Button>
    </div>
  )
}

import { frontend } from '@/routes/routes'
import { Button } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const ProjectToolbar = () => {
  const { t } = useTranslation('projects')

  return (
    <Link to={frontend.projects.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        {t('page.new')}
      </Button>
    </Link>
  )
}

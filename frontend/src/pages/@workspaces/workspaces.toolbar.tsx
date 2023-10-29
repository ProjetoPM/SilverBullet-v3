import { frontend } from '@/routes/routes'
import { Button } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const WorkspaceToolbar = () => {
  const { t } = useTranslation('workspaces')

  return (
    <Link to={frontend.workspaces.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        {t('page.new')}
      </Button>
    </Link>
  )
}

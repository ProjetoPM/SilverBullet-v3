import { frontend } from '@/routes/routes'
import { Button } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const WorkspaceToolbar = () => {
  const { t } = useTranslation('workspaces')

  return (
    <Button
      color="primary"
      endContent={<PlusIcon />}
      as={Link}
      to={frontend.workspaces.new}
    >
      {t('page.new')}
    </Button>
  )
}

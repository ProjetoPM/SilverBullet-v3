import { frontend } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const WorkspaceToolbar = () => {
  const { t } = useTranslation('workspaces')

  return (
    <Link href={frontend.workspaces.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        {t('page.new')}
      </Button>
    </Link>
  )
}

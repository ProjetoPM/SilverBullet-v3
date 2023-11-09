import { frontend } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const WorkspaceToolbar = () => {
  const { t } = useTranslation('workspaces')

  return (
    <div className="flex gap-2">
      <Button
        color="primary"
        endContent={<PlusIcon />}
        as={Link}
        href={frontend.workspaces.new}
      >
        {t('page.new')}
      </Button>
    </div>
  )
}

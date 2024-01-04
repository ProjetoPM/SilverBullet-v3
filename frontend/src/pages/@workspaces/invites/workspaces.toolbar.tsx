import { Button, useDisclosure } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { WorkspaceInviteModal } from './workspaces.invites.modal'

export const WorkspaceInviteToolbar = () => {
  const modal = useDisclosure()
  const { t } = useTranslation('workspaces')

  return (
    <>
      <div className="flex gap-2">
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onPress={modal.onOpen}
        >
          {t('invites.new')}
        </Button>
      </div>
      <WorkspaceInviteModal {...modal} />
    </>
  )
}

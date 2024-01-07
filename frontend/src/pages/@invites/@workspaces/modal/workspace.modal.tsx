import { useFetch } from '@/hooks/useFetch'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { UserPlus2 } from 'lucide-react'
import { InputEmails } from '../../shared/components/InputEmails'
import { TemplateButton } from '../../shared/components/TemplateButton'
import { UploadButton } from '../../shared/components/UploadButton'
import { useWorkspaceInvites } from '../../shared/hooks/useWorkspaceInvites'
import { InviteContextProps, Invites } from '../../shared/provider/@types'
import { template } from '../../shared/template/template.workspaces'
import { WorkspaceModalSelect } from './workspace.modal.select'

type WorkspaceInviteModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

type SendInvite = {
  data: Invites[]
}

export const WorkspaceInviteModal = ({
  isOpen,
  onOpenChange
}: WorkspaceInviteModalProps) => {
  const {
    t,
    input: [emails, setEmails],
    invites: [invites, setInvites],
    roles
  } = useWorkspaceInvites()

  const { generic } = useFetch<SendInvite>({
    baseUrl: '/invites/workspace',
    invalidateQueries: ['workspace', 'invites']
  })

  const onSubmit = async (fn?: () => void) => {
    try {
      await generic.mutateAsync({ data: Array.from(invites) })
      setInvites(new Set())
    } catch (e) {
      console.error(e)
    }
    fn?.()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        scrollBehavior="inside"
        size="lg"
        shouldBlockScroll
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="flex items-center gap-3 text-2xl">
                  <UserPlus2 className="w-7 h-7" />
                  {t('page.invites')}
                </h1>
                <h2 className="text-lg font-thin">
                  {t('invites.description')}
                </h2>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-2">
                  <UploadButton invites={[invites, setInvites]} />
                  <TemplateButton template={template} />
                </div>
                <div className="flex flex-col gap-3">
                  <InputEmails
                    emails={[emails, setEmails]}
                    invites={[invites, setInvites]}
                    roles={roles as InviteContextProps['roles']}
                  />
                  <WorkspaceModalSelect />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => onSubmit(onClose)}
                  isLoading={generic.isPending}
                  isDisabled={generic.isPending || invites.size === 0}
                  fullWidth
                >
                  {t('invites.submit')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

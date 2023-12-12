import { Text } from '@/components/ui/label/Text'
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tooltip
} from '@nextui-org/react'
import { ListRestart, UserPlus2 } from 'lucide-react'
import { KeyboardEvent, useCallback } from 'react'
import {
  WorkspaceRoles,
  useWorkspaceInvites
} from './context/WorkspaceInviteContext'
import { WorkspaceTemplateButton } from './modal/workspaces.template'
import { WorkspaceUploadButton } from './modal/workspaces.upload'

type WorkspaceInviteModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const WorkspaceInviteModal = ({
  isOpen,
  onOpenChange
}: WorkspaceInviteModalProps) => {
  const {
    t,
    input: [emails, setEmails],
    roles: [role, setRole],
    invites: [invites, setInvites]
  } = useWorkspaceInvites()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && emails.trim() !== '') {
        e.preventDefault()

        const split = emails
          .toLowerCase()
          .split(',')
          .map((email) => email.trim())

        /**
         * Filtering the emails that do not yet exist in the list,
         * to avoid duplicates
         */
        const uniqueEmails = split.filter(
          (email) => !invites.some((invite) => invite.email === email)
        )
        for (const email of uniqueEmails) {
          invites.push({ email, role: role.values().next().value })
        }
        setEmails('')
      }
    },
    [emails, role, invites, setEmails]
  )

  const onRemove = useCallback(
    (index: number) => {
      const updatedEmails = invites.filter((_, i) => i !== index)
      setInvites(updatedEmails)
    },
    [invites, setInvites]
  )

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        scrollBehavior="inside"
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
                  <WorkspaceUploadButton />
                  <WorkspaceTemplateButton />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-end gap-2" role="group">
                    <Input
                      id="emails"
                      color="primary"
                      variant="bordered"
                      labelPlacement="outside"
                      label={t('invites.emails.label')}
                      placeholder={t('invites.emails.placeholder')}
                      value={emails}
                      onValueChange={(value) => setEmails(value)}
                      onKeyDown={handleKeyDown}
                      autoComplete="off"
                      classNames={{ label: 'text-foreground' }}
                      isClearable
                    />
                    <Tooltip content={'Reset'}>
                      <Button
                        variant="bordered"
                        onPress={() => setInvites([])}
                        className="border-medium border-default-200 hover:border-default-400"
                        isDisabled={invites.length === 0}
                        isIconOnly
                      >
                        <ListRestart className="w-5 h-5" />
                      </Button>
                    </Tooltip>
                  </div>
                  <Select
                    label="Role"
                    color="primary"
                    labelPlacement="outside"
                    placeholder="Select a role"
                    variant="bordered"
                    selectionMode="single"
                    selectedKeys={role}
                    onSelectionChange={(key) =>
                      setRole(key as Set<WorkspaceRoles>)
                    }
                    classNames={{ label: 'text-foreground' }}
                    disallowEmptySelection
                  >
                    <SelectItem key="STUDENT">
                      {t('invites.roles.student')}
                    </SelectItem>
                    <SelectItem key="ADMIN">
                      {t('invites.roles.admin')}
                    </SelectItem>
                  </Select>
                  <section onDrop={() => console.log('hu')}>
                    <div className="flex items-center justify-between">
                      <Text size="sm" className="font-normal" withPadding>
                        {t('invites.users_to_be_invited')}
                      </Text>
                    </div>
                    <div className="flex gap-2 border border-dashed border-default-300 rounded-lg flex-wrap p-2 max-h-72 overflow-y-auto">
                      {invites.length === 0 && (
                        <Text
                          size="sm"
                          className="text-foreground-400 font-normal px-1"
                        >
                          {t('invites.no_invites')}
                        </Text>
                      )}
                      {invites.map((invite, index) => (
                        <Chip
                          key={invite.email}
                          color={
                            invite.role === 'STUDENT' ? 'success' : 'warning'
                          }
                          variant="dot"
                          radius="md"
                          onClose={() => onRemove(index)}
                        >
                          {invite.email}
                        </Chip>
                      ))}
                    </div>
                  </section>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" fullWidth onPress={onClose}>
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

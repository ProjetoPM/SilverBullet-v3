import { Text } from '@/@components/UI/Label/Text'
import { usePageLayout } from '@/layout/PageLayoutProvider'
import { Chip, Select, SelectItem } from '@nextui-org/react'
import {
  WorkspaceRoles,
  useWorkspaceInvites
} from '../../shared/hooks/useWorkspaceInvites'
import { Invites } from '../../shared/provider/@types'

export const WorkspaceModalSelect = () => {
  const { t } = usePageLayout()
  const {
    invites: [invites, setInvites],
    roles: [role, setRole]
  } = useWorkspaceInvites()

  const onRemove = (invite: Invites) => {
    invites.delete(invite)
    setInvites(new Set(invites))
  }

  return (
    <>
      <Select
        label="Role"
        color="primary"
        labelPlacement="outside"
        placeholder="Select a role"
        variant="bordered"
        selectionMode="single"
        selectedKeys={role}
        onSelectionChange={(key) => setRole(key as Set<WorkspaceRoles>)}
        classNames={{ label: 'text-foreground' }}
        disallowEmptySelection
      >
        {Object.values<WorkspaceRoles>(['USER', 'ADMIN']).map((role) => (
          <SelectItem key={role}>
            {t(`invites.roles.${role.toLowerCase()}`)}
          </SelectItem>
        ))}
      </Select>
      <section>
        <div className="flex items-center justify-between">
          <Text size="sm" className="font-normal" withPadding>
            {t('invites.users_to_be_invited')}
          </Text>
        </div>
        <div className="flex gap-2 border border-dashed border-default-300 rounded-lg flex-wrap p-2 max-h-72 overflow-y-auto">
          {invites.size === 0 && (
            <Text size="sm" className="text-foreground-400 font-normal px-1">
              {t('invites.no_invites')}
            </Text>
          )}
          {Array.from(invites).map((invite) => (
            <Chip
              key={invite.email}
              color={invite.role === 'USER' ? 'success' : 'warning'}
              variant="dot"
              radius="md"
              onClose={() => onRemove(invite)}
            >
              {invite.email}
            </Chip>
          ))}
        </div>
      </section>
    </>
  )
}

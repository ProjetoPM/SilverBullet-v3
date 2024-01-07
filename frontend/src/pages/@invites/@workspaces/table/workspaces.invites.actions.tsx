import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure
} from '@nextui-org/react'
import { Copy, FolderOpen, MoreHorizontal, Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { WorkspaceInviteColumns } from './workspaces.invites.columns'

type WorkspaceInviteActionsProps = {
  row: WorkspaceInviteColumns
}

export const WorkspaceActions = ({ row }: WorkspaceInviteActionsProps) => {
  const { t } = useTranslation(['default', 'workspaces'])
  const [dropdown, modal] = [useDisclosure(), useDisclosure()]

  return (
    <>
      <Dropdown {...dropdown}>
        <DropdownTrigger>
          <Button variant="light" isIconOnly>
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="dropdown reporter"
          onMouseLeave={dropdown.onClose}
        >
          <DropdownSection title={t('default:table.actions')}>
            <DropdownItem textValue="open">
              <span className="flex gap-2">
                <FolderOpen className="w-5 h-5" />
                {t('btn.open')}
              </span>
            </DropdownItem>
            <DropdownItem onPress={modal.onOpen} textValue="delete" showDivider>
              <span className="flex gap-2 text-danger">
                <Trash className="w-5 h-5" />
                {t('btn.delete')}
              </span>
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            textValue="Copy ID"
            onPress={() => navigator.clipboard.writeText(row._id)}
          >
            <span className="flex gap-2">
              <Copy className="w-5 h-5" />
              {t('btn.copy_id')}
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

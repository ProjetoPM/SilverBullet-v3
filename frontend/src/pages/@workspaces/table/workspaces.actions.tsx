import { AlertModal } from '@/components/ui/AlertModal'
import { useFetch } from '@/hooks/useFetch'
import { backend, frontend } from '@/routes/routes'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { replaceParams } from '@/utils/helpers/replace-params'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure
} from '@nextui-org/react'
import {
  Copy,
  FileSignature,
  FolderOpen,
  MoreHorizontal,
  Trash,
  Users
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { WorkspaceColumns } from './workspaces.columns'

type WorkspaceActionsProps = {
  row: WorkspaceColumns
}

export const WorkspaceActions = ({ row }: WorkspaceActionsProps) => {
  const { t } = useTranslation(['default', 'workspaces'])
  const [dropdown, modal] = [useDisclosure(), useDisclosure()]
  const openWorkspace = useWorkspaceStore((state) => state.openWorkspace)
  const navigate = useNavigate()

  const { removeMany } = useFetch<WorkspaceColumns>({
    baseUrl: backend.workspaces.baseUrl,
    invalidateQueries: ['workspaces']
  })

  const handleDelete = async () => {
    await removeMany.mutateAsync(row)
  }

  const handleOpen = async () => {
    openWorkspace(row)
    navigate(frontend.projects.index)
  }

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
            <DropdownItem textValue="open" onPress={handleOpen}>
              <span className="flex gap-2">
                <FolderOpen className="w-5 h-5" />
                {t('btn.open')}
              </span>
            </DropdownItem>
            <DropdownItem
              textValue="edit"
              href={replaceParams(frontend.workspaces.edit, [row._id])}
            >
              <div className="flex gap-2">
                <FileSignature className="w-5 h-5" />
                {t('btn.edit')}
              </div>
            </DropdownItem>
            <DropdownItem onPress={modal.onOpen} textValue="delete" showDivider>
              <span className="flex gap-2 text-danger">
                <Trash className="w-5 h-5" />
                {t('btn.delete')}
              </span>
            </DropdownItem>
            <DropdownItem
              textValue="users"
              href={replaceParams(frontend.workspaces.users.index, [row._id])}
              showDivider
            >
              <span className="flex gap-2">
                <Users className="w-5 h-5" />
                {t('btn.invite_users')}
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
      <AlertModal
        title={t('default:are_you_certain.title')}
        onAction={handleDelete}
        {...modal}
      >
        {t('default:are_you_certain.description')}
      </AlertModal>
    </>
  )
}

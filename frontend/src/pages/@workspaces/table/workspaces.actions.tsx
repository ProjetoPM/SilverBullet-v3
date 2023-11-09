import { AlertModal } from '@/components/ui/AlertModal'
import { useFetch } from '@/hooks/useFetch'
import { backend, frontend } from '@/routes/routes'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { replaceParams } from '@/utils/replace-params'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  useDisclosure
} from '@nextui-org/react'
import {
  Copy,
  FileSignature,
  FolderOpen,
  MoreHorizontal,
  Trash
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { WorkspaceColumns } from './workspaces.columns'

type WorkspaceActionsProps = {
  row: WorkspaceColumns
}

export const WorkspaceActions = ({ row }: WorkspaceActionsProps) => {
  const { t } = useTranslation(['default', 'workspaces'])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [openWorkspace] = useWorkspaceStore((store) => [store.openWorkspace])

  const { removeMany } = useFetch<WorkspaceColumns>({
    baseUrl: backend.workspaces.baseUrl,
    keys: ['workspaces']
  })

  const handleDelete = async () => {
    await removeMany.mutateAsync(row)
  }

  const handleOpen = async () => {
    openWorkspace(row)
    toast.success(t('workspaces:actions.workspace_opened'))
  }

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" isIconOnly>
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="dropdown reporter">
          <DropdownSection title={t('table.actions')}>
            <DropdownItem textValue="open">
              <Link
                href={frontend.projects.index}
                color="foreground"
                onPress={handleOpen}
                className="flex gap-2"
              >
                <FolderOpen className="w-5 h-5" />
                {t('btn.open')}
              </Link>
            </DropdownItem>
            <DropdownItem textValue="edit">
              <Link
                href={replaceParams(frontend.workspaces.edit, [row.id])}
                color="foreground"
                className="flex gap-2"
              >
                <FileSignature className="w-5 h-5" />
                {t('btn.edit')}
              </Link>
            </DropdownItem>
            <DropdownItem onPress={onOpen} textValue="delete" showDivider>
              <span className="flex gap-2 text-danger">
                <Trash className="w-5 h-5" />
                {t('btn.delete')}
              </span>
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            textValue="Copy ID"
            onPress={() => navigator.clipboard.writeText(row.id)}
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {t('default:are_you_certain.description')}
      </AlertModal>
    </>
  )
}

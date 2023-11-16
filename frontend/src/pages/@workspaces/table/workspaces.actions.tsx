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
  Trash
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { WorkspaceColumns } from './workspaces.columns'

type WorkspaceActionsProps = {
  row: WorkspaceColumns
}

export const WorkspaceActions = ({ row }: WorkspaceActionsProps) => {
  const { t } = useTranslation(['default', 'workspaces'])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const openWorkspace = useWorkspaceStore((state) => state.openWorkspace)

  const { removeMany } = useFetch<WorkspaceColumns>({
    baseUrl: backend.workspaces.baseUrl,
    keys: ['workspaces']
  })

  const handleDelete = async () => {
    await removeMany.mutateAsync(row)
  }

  const handleOpen = () => {
    openWorkspace(row)
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
          <DropdownSection title={t('default:table.actions')}>
            <DropdownItem
              textValue="open"
              href={frontend.projects.index}
              onPress={handleOpen}
            >
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
            <DropdownItem onPress={onOpen} textValue="delete" showDivider>
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

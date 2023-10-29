import { AlertModal } from '@/components/ui/AlertModal'
import { useFetch } from '@/hooks/useFetch'
import { backend, frontend } from '@/routes/routes'
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
import { ProjectColumns } from './projects.columns'

type WorkspaceActionsProps = {
  row: ProjectColumns
}

export const WorkspaceActions = ({ row }: WorkspaceActionsProps) => {
  const { t } = useTranslation(['default', 'projects'])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { removeMany } = useFetch<ProjectColumns>({
    baseUrl: backend.projects.baseUrl,
    query: ['projects']
  })

  const handleDelete = async () => {
    await removeMany.mutateAsync(row)
  }

  const handleOpen = () => {
    toast.error('Not implemented yet')
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
            <DropdownItem onClick={handleOpen} textValue="open">
              <span className="flex gap-2">
                <FolderOpen className="w-5 h-5" />
                {t('btn.open')}
              </span>
            </DropdownItem>
            <DropdownItem textValue="edit">
              <Link
                href={replaceParams(frontend.projects.edit, [row.id])}
                color="foreground"
                className="flex gap-2"
              >
                <FileSignature className="w-5 h-5" />
                {t('btn.edit')}
              </Link>
            </DropdownItem>
            <DropdownItem onClick={onOpen} textValue="delete" showDivider>
              <span className="flex gap-2 text-danger">
                <Trash className="w-5 h-5" />
                {t('btn.delete')}
              </span>
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            textValue="Copy ID"
            onClick={() => navigator.clipboard.writeText(row.id)}
          >
            <span className="flex gap-2">
              <Copy className="w-5 h-5" />
              {t('btn.copy_id')}
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <AlertModal
        title={t('are_you_certain.title')}
        onAction={handleDelete}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {t('are_you_certain_delete.description')}
      </AlertModal>
    </>
  )
}

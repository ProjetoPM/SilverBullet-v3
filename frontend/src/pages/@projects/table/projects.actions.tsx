import { AlertModal } from '@/components/ui/AlertModal'
import { useFetch } from '@/hooks/useFetch'
import { backend, frontend } from '@/routes/routes'
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
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { ProjectColumns } from './projects.columns'

type ProjectActionsProps = {
  row: ProjectColumns
}

export const ProjectActions = ({ row }: ProjectActionsProps) => {
  const { t } = useTranslation(['default', 'projects'])
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  const { removeMany } = useFetch<ProjectColumns>({
    baseUrl: backend.projects.baseUrl,
    invalidateQueries: ['projects']
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
            <DropdownItem onPress={handleOpen} textValue="open">
              <span className="flex gap-2">
                <FolderOpen className="w-5 h-5" />
                {t('btn.open')}
              </span>
            </DropdownItem>
            <DropdownItem
              textValue="edit"
              href={replaceParams(frontend.projects.edit, [row._id])}
            >
              <span className="flex gap-2">
                <FileSignature className="w-5 h-5" />
                {t('btn.edit')}
              </span>
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

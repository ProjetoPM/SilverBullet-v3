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
import { Copy, FileSignature, MoreHorizontal, Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { WorkspaceColumns } from './workspaces.columns'

type WorkspaceActionsProps = {
  row: WorkspaceColumns
}

export const WorkspaceActions = ({ row }: WorkspaceActionsProps) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { removeMany } = useFetch<WorkspaceColumns>({
    baseUrl: backend.workspaces.baseUrl,
    query: ['workspaces']
  })

  const handleDelete = async () => {
    await removeMany.mutateAsync(row)
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
        title={t('common:are_you_certain.title')}
        onAction={handleDelete}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {t('common:are_you_certain_delete.description')}
      </AlertModal>
    </>
  )
}

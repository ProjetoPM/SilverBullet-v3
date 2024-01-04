import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link
} from '@nextui-org/react'
import { ChevronDownIcon, PlusIcon } from 'lucide-react'
import { useDataTable } from '../context/DataTableProvider'

export type ToolbarProps = {
  button: {
    href: string
    label?: string
  }
  extraButtons?: Array<{
    label: string
    href: string
    description?: string
  }>
}

export const DataTableToolbarButtons = ({
  button,
  extraButtons
}: ToolbarProps) => {
  const { t, ns } = useDataTable()

  return (
    <ButtonGroup variant="flat">
      <Button
        color="primary"
        variant="solid"
        startContent={<PlusIcon />}
        as={Link}
        href={button.href}
      >
        {button.label ?? t('page.new', { ns })}
      </Button>
      {extraButtons && (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button color="primary" variant="solid" isIconOnly>
              <ChevronDownIcon className="w-5 h-5" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Merge options"
            selectionMode="single"
            className="max-w-[300px]"
          >
            {extraButtons.map((button) => (
              <DropdownItem
                key={button.label}
                href={button.href}
                description={button.description}
              >
                {button.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
    </ButtonGroup>
  )
}

import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownItemProps,
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
  extraButtons?: Array<
    DropdownItemProps & {
      label: string
      href: string
    }
  >
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
        <Dropdown placement="bottom-end" backdrop="opaque">
          <DropdownTrigger>
            <Button color="primary" variant="solid" isIconOnly>
              <ChevronDownIcon className="w-5 h-5" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="toolbar extra buttons"
            selectionMode="single"
          >
            {extraButtons.map((button) => (
              <DropdownItem
                key={button.label}
                description={button.description}
                {...button}
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

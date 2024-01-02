import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { ComponentProps } from 'react'

export type BreadcrumbItemProps = {
  label: string
  link?: string
}

export type BreadcrumbProps = ComponentProps<'section'> & {
  items: Array<BreadcrumbItemProps>
  className?: string
}

export const Breadcrumb = ({ className, items = [] }: BreadcrumbProps) => {
  return (
    <Breadcrumbs
      className={className}
      size="sm"
      itemsBeforeCollapse={1}
      itemsAfterCollapse={2}
      maxItems={3}
      renderEllipsis={({ items, ellipsisIcon, separator }) => (
        <div className="flex items-center">
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                className="min-w-unit-6 w-unit-6 h-unit-6"
                size="sm"
                variant="flat"
              >
                {ellipsisIcon}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Routes">
              {items.map((item) => (
                <DropdownItem key={item.id} href={item.href}>
                  {item.children}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {separator}
        </div>
      )}
    >
      {items.map((item, index) => (
        <BreadcrumbItem
          key={`${item.label}-${index}`}
          href={item.link}
          classNames={{
            item: 'uppercase font-medium tracking-wider'
          }}
        >
          {item.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  )
}

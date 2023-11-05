import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  cn
} from '@nextui-org/react'
import { ComponentProps } from 'react'

export type BreadcrumbItem = {
  label: string
  link?: string
}

type BreadcrumbProps = ComponentProps<'section'> & {
  title: string
  items: Array<BreadcrumbItem>
  imageSrc?: string | boolean
}

export const Breadcrumb = ({
  title,
  items = [],
  className,
  imageSrc,
  ...props
}: BreadcrumbProps) => {
  return (
    <>
      {imageSrc && typeof imageSrc === 'string' && (
        <Image
          src={imageSrc}
          classNames={{
            wrapper: 'max-w-full min-w-full mt-2 mb-5',
            img: 'max-h-40 object-cover max-w-full min-w-full'
          }}
          isZoomed
        />
      )}
      <section className={cn('flex flex-col pt-5', className)} {...props}>
        <Breadcrumbs
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
                  {items.map((item, index) => (
                    <DropdownItem key={index} href={item.href}>
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
              key={index}
              href={item.link}
              classNames={{
                item: 'uppercase font-medium tracking-wider'
              }}
            >
              {item.label}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
        <span className="mt-0.5 text-2xl font-bold tracking-wide">{title}</span>
      </section>
    </>
  )
}

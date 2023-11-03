import { cn } from '@/lib/utils'
import { Button, Image } from '@nextui-org/react'
import { ChevronRight } from 'lucide-react'
import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

export type BreadcrumbItem = {
  label: string
  link?: string
}

type BreadcrumbProps = ComponentProps<'div'> & {
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
      <div
        className={cn('flex flex-col gap-1', className, {
          'mt-5': !imageSrc
        })}
        {...props}
      >
        <ol className="text-sm flex items-center overflow-y-auto">
          {items.map((item, index) => {
            const isFirst = index === 0

            return (
              <div className="flex gap-2" key={item.label}>
                <li
                  key={item.label}
                  className="flex items-center text-xs font-bold uppercase tracking-wider min-w-max"
                >
                  {!isFirst && <ChevronRight size={20} />}

                  {item.link && (
                    <Button
                      className="text-xs font-bold uppercase tracking-wider min-w-max bg-transparent px-2 py-1 decoration-primary focus:text-primary focus-visible:text-primary hover:text-primary hover:border p-0"
                      radius="sm"
                      data-focus-visible={false}
                      data-focus={false}
                      size="sm"
                      as={Link}
                      to={item.link}
                    >
                      {item.label}
                    </Button>
                  )}

                  {!item.link && item.label}
                </li>
              </div>
            )
          })}
        </ol>
        <span className="text-2xl font-bold tracking-wide">{title}</span>
      </div>
    </>
  )
}

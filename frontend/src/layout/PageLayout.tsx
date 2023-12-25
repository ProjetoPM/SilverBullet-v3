import { Loading } from '@/components/Loading'
import {
  Breadcrumb,
  BreadcrumbItemProps,
  BreadcrumbProps
} from '@/components/ui/Breadcrumb'
import { cn } from '@nextui-org/react'
import { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { description } from './meta'

export type PageLayoutProps = {
  title: string
  children?: ReactNode
  isLoading?: boolean
  endContent?: ReactNode
  breadcrumb?: BreadcrumbItemProps[]
  breadcrumbProps?: Omit<BreadcrumbProps, 'title' | 'items'>
}

export const PageLayout = ({
  title,
  breadcrumb,
  children,
  endContent,
  isLoading = false,
  breadcrumbProps = {}
}: PageLayoutProps) => {
  const { className, ...restBreadcrumbProps } = breadcrumbProps

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>SilverBullet {title && `| ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      {breadcrumb && (
        <div className="flex flex-col xss:flex-row items-center gap-1 xss:gap-2 justify-between mb-5 xss:mb-0">
          <Breadcrumb
            title={title}
            items={breadcrumb}
            className={cn('mb-0 xss:mb-5', className)}
            {...restBreadcrumbProps}
          />
          <div className="self-end xss:self-auto">{endContent}</div>
        </div>
      )}
      <main>{children}</main>
    </>
  )
}

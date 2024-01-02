import { Loading } from '@/components/Loading'
import { Breadcrumb, BreadcrumbItemProps } from '@/components/UI/Breadcrumb'
import { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { description } from './meta'
import { cn } from '@/lib/utils'

export type PageLayoutProps = {
  title: string
  children?: ReactNode
  isLoading?: boolean
  endContent?: ReactNode
  isAuth?: boolean
  className?: string
  breadcrumbs?: BreadcrumbItemProps[]
  breadcrumbProps?: {
    className?: string
  }
}

export const PageLayout = ({
  title,
  breadcrumbs,
  children,
  endContent,
  className,
  isLoading = false,
  isAuth = false,
  breadcrumbProps
}: PageLayoutProps) => {
  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>SilverBullet {title && `| ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      {!isAuth && (
        <>
          <section className="flex flex-col flex-wrap py-4">
            {breadcrumbs && (
              <Breadcrumb items={breadcrumbs} {...breadcrumbProps} />
            )}
            <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
          </section>
          <div className="self-end xss:self-auto">{endContent}</div>
        </>
      )}
      <main className={cn('w-full h-full', className)}>{children}</main>
    </>
  )
}

import { Loading } from '@/components/Loading'
import { Breadcrumb, BreadcrumbItemProps } from '@/components/UI/Breadcrumb'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { PageLayoutProvider } from './PageLayoutProvider'
import { description } from './meta'

export type PageLayoutProps = {
  title: string
  ns?: string | string[]
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
  breadcrumbProps,
  ns
}: PageLayoutProps) => {
  const { t } = useTranslation(ns)

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
        <div className="flex justify-between items-center">
          <section
            className={cn(
              'flex flex-col flex-wrap py-5',
              breadcrumbProps?.className
            )}
          >
            {breadcrumbs && (
              <Breadcrumb items={breadcrumbs} {...breadcrumbProps} />
            )}
            <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
          </section>
          <div className="self-end xss:self-auto">{endContent}</div>
        </div>
      )}
      <PageLayoutProvider t={t} ns={ns}>
        <main className={cn('w-full', className)}>{children}</main>
      </PageLayoutProvider>
    </>
  )
}

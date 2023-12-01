import { Loading } from '@/components/Loading'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { description } from './meta'

export type PageLayoutProps = {
  title: string
  children?: React.ReactNode
  breadcrumb?: Array<{ label: string; link?: string }>
  imageSrc?: string
  isLoading?: boolean
  endContent?: React.ReactNode
}

export const PageLayout = ({
  title,
  breadcrumb,
  imageSrc,
  children,
  endContent,
  isLoading = false
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
      {breadcrumb && (
        <div className="flex flex-col xss:flex-row items-center gap-1 xss:gap-2 justify-between mb-5 xss:mb-0">
          <Breadcrumb
            title={title}
            items={breadcrumb}
            imageSrc={imageSrc ?? false}
            className="mb-5"
          />
          <div className="self-end xss:self-auto">{endContent}</div>
        </div>
      )}
      <main>{children}</main>
    </>
  )
}

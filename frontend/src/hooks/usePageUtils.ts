import { BreadcrumbItemProps } from '@/components/UI/Breadcrumb'
import { frontend } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

type UsePageUtilsProps = {
  home?: BreadcrumbItemProps
}

type PageProps = {
  appendTitle?: boolean
  segments?: BreadcrumbItemProps[]
}

type TitleProps = {
  dynamic?: boolean
  override?: string
}

export const usePageUtils = (
  ns?: string | string[],
  {
    home = { label: 'Home', link: frontend.workspaces.index }
  }: UsePageUtilsProps = {}
) => {
  const [{ id }, { t }] = [useParams(), useTranslation(ns)]

  let __override__: TitleProps['override']
  let __dynamic__: TitleProps['dynamic']

  const title = ({ override, dynamic = false }: TitleProps = {}) => {
    if (override) {
      __override__ = override
      return t(override)
    }

    if (dynamic) {
      __dynamic__ = true
      return id ? t('page.edit') : t('page.new')
    }

    return t('page.title')
  }

  const breadcrumbs = ({ segments, appendTitle = false }: PageProps = {}) => {
    const start = home ? [home] : []
    const middle = start && segments ? [home, ...segments] : [...start]

    const end = __dynamic__
      ? [...middle, { label: title({ override: __override__ }) }]
      : middle

    const content = appendTitle
      ? [...end, { label: title({ override: __override__ }) }]
      : end

    return content
  }

  return { id, t, title, breadcrumbs }
}

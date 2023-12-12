import { BreadcrumbItemProps } from '@/components/ui/Breadcrumb'
import { frontend } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

type UsePageUtilsProps = {
  dynamic?: boolean
  home?: BreadcrumbItemProps
  title?: string
}

type PageProps = {
  appendTitle?: boolean
  segments?: BreadcrumbItemProps[]
}

export const usePageUtils = (
  ns?: string | string[],
  {
    title: _title,
    dynamic = false,
    home = { label: 'Home', link: frontend.workspaces.index }
  }: UsePageUtilsProps = {}
) => {
  const { id } = useParams()
  const { t } = useTranslation(ns)

  const title = () => {
    if (_title) {
      return t(_title)
    }

    if (dynamic) {
      return id ? t('page.edit') : t('page.new')
    }

    return t('page.title')
  }

  const breadcrumb = ({ segments, appendTitle = false }: PageProps = {}) => {
    const start = home ? [home] : []
    const middle = start && segments ? [home, ...segments] : [...start]
    const end = dynamic ? [...middle, { label: title() }] : middle
    const content = appendTitle ? [...end, { label: title() }] : end

    return content
  }

  return { id: id ?? '', t, title, breadcrumb }
}

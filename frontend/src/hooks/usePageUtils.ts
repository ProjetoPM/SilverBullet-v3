import { BreadcrumbItem } from '@/components/ui/Breadcrumb'
import { frontend } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

type UsePageUtilsProps = {
  dynamic?: boolean
  _default?: boolean
}

type PageProps = {
  appendTitle?: boolean
  segments?: BreadcrumbItem[]
}

export const usePageUtils = (
  ns?: string | string[],
  { dynamic = false, _default = true }: UsePageUtilsProps = {}
) => {
  const { id } = useParams()
  const { t } = useTranslation(ns)

  const title = () => {
    if (dynamic) {
      return id ? t('page.edit') : t('page.new')
    }

    return t('page.title')
  }

  const breadcrumb = ({ segments, appendTitle = false }: PageProps = {}) => {
    const start = _default
      ? [{ label: 'Home', link: frontend.workspaces.index }]
      : []

    const middle = start && segments ? [...start, ...segments] : [...start]
    const end = dynamic ? [...middle, { label: title() }] : middle
    const content = appendTitle ? [...end, { label: title() }] : end

    return content
  }

  return { id, t, title, breadcrumb }
}

import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, frontend } from '@/routes/routes'
import { ProjectForm } from './projects.form'
import { ProjectDataWithId } from './projects.schema'

export const ProjectPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('projects')

  const { get } = useFetch<ProjectDataWithId>({
    baseUrl: backend.projects.baseUrl,
    keys: ['projects'],
    fetch: {
      get: {
        append: id
      }
    }
  })

  return (
    <PageLayout
      title={title({ dynamic: true })}
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: t('page.title'), link: frontend.projects.index }]
      })}
    >
      <ProjectForm data={get.data} />
    </PageLayout>
  )
}

import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { backend, frontend } from '@/routes/routes'
import { ProjectForm } from './projects.form'
import { ProjectData } from './projects.schema'

export const ProjectPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('projects', {
    dynamic: true
  })

  const { get } = useFetch<ProjectData>({
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
      title={title()}
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: t('page.title'), link: frontend.projects.index }]
      })}
    >
      <ProjectForm data={get.data} />
    </PageLayout>
  )
}

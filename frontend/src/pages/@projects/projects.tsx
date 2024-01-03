import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { ProjectForm } from './projects.form'
import { ProjectData } from './projects.schema'

export const ProjectPage = () => {
  const { id, ns, title, breadcrumbs } = usePageUtils('projects')

  const { get } = useFetch<ProjectData>({
    baseUrl: backend.projects.baseUrl,
    fetch: {
      keys: ['projects', id],
      get: {
        append: id
      }
    }
  })

  return (
    <PageLayout
      title={title({ dynamic: true })}
      breadcrumbs={breadcrumbs()}
      ns={ns}
      {...get}
    >
      <ProjectForm data={get.data} />
    </PageLayout>
  )
}

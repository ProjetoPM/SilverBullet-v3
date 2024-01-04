import { useFetch } from '@/hooks/useFetch'
import { usePage } from '@/hooks/usePage'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { ProjectForm } from './projects.form'
import { ProjectData } from './projects.schema'

export default function ProjectPage() {
  const { id, ns, title, breadcrumbs } = usePage('projects')

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
      isLoading={get.isLoading}
      ns={ns}
    >
      <ProjectForm data={get.data} />
    </PageLayout>
  )
}

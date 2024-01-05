import { frontend } from '@/routes/routes'
import { WorkspaceStore } from '@/stores/useWorkspaceStore'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

type ProjectGuardProps = {
  children: React.ReactNode
  redirectTo?: string
}

const validator = z.object({
  _id: z.string().cuid2()
})

const isProjectInvalid = () => {
  const project = WorkspaceStore.getProject()
  return !project || !validator.safeParse(project).success
}

export const WG_PROJECT_NOT_FOUND_ID = 'guard:project-not-found'

export const ProjectGuard = ({ redirectTo, children }: ProjectGuardProps) => {
  const { t } = useTranslation('errors')
  const navigate = useNavigate()
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    if (isProjectInvalid()) {
      toast.error(t('project.not_found'), {
        id: WG_PROJECT_NOT_FOUND_ID
      })
      navigate(redirectTo ?? frontend.projects.index)
    }
    setMounted(true)
  }, [redirectTo, t, navigate])

  return <>{isMounted && children}</>
}

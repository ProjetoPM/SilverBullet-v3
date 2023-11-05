import { frontend } from '@/routes/routes'
import { Workspace } from '@/stores/useWorkspaceStore'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

type WorkspaceGuardProps = {
  children: React.ReactNode
}

const validator = z.object({
  id: z.string().uuid()
})

const validateWorkspace = () => {
  const workspace = Workspace.getWorkspace()
  return !workspace || !validator.safeParse(workspace).success
}

export const WG_WORKSPACE_NOT_FOUND_ID = 'guard:workspace-not-found'

export const WorkspaceGuard = ({ children }: WorkspaceGuardProps) => {
  const { t } = useTranslation('errors')
  const navigate = useNavigate()
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    if (validateWorkspace()) {
      toast.error(t('workspace.not_found'), {
        id: WG_WORKSPACE_NOT_FOUND_ID
      })
      navigate(frontend.workspaces.index)
    }
    setMounted(true)
  }, [t, navigate])

  return <>{isMounted && children}</>
}

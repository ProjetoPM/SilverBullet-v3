import { frontend } from '@/routes/routes'
import { WorkspaceStore } from '@/stores/useWorkspaceStore'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

type WorkspaceGuardProps = {
  children: React.ReactNode
  redirectTo?: string
}

const validator = z.object({
  _id: z.string().uuid()
})

const validateWorkspace = () => {
  const workspace = WorkspaceStore.getWorkspace()
  return !workspace || !validator.safeParse(workspace).success
}

export const WG_WORKSPACE_NOT_FOUND_ID = 'guard:workspace-not-found'

export const WorkspaceGuard = ({
  redirectTo,
  children
}: WorkspaceGuardProps) => {
  const { t } = useTranslation('errors')
  const navigate = useNavigate()
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    if (validateWorkspace()) {
      toast.error(t('workspace.not_found'), {
        id: WG_WORKSPACE_NOT_FOUND_ID
      })
      navigate(redirectTo ?? frontend.workspaces.index)
    }
    setMounted(true)
  }, [redirectTo, t, navigate])

  return <>{isMounted && children}</>
}

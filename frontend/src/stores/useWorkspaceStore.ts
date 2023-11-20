import { t } from 'i18next'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type Project = {
  _id: string
  name: string
}

type Workspace = {
  _id: string
  name: string
}

type WorkspaceStoreProps = {
  workspace: Workspace | null
  project: Project | null
  openWorkspace: (workspace: Workspace) => void
  closeWorkspace: () => void
}

export const useWorkspaceStore = create<WorkspaceStoreProps>()(
  devtools(
    persist<WorkspaceStoreProps>(
      () => ({
        workspace: null,
        project: null,
        openWorkspace: (workspace) => openWorkspace(workspace),
        closeWorkspace: () => closeWorkspace()
      }),
      {
        name: 'workspace',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)

/**
 * Abre um workspace.
 */
const openWorkspace = (workspace: Workspace) => {
  useWorkspaceStore.setState((state) => ({
    ...state,
    workspace,
    project: null
  }))
  updateWorkspaceName()
  toast.success(t('workspaces:actions.workspace_opened', { ns: 'workspaces' }))
}

/**
 * Fechando um workspace.
 */
const closeWorkspace = () => {
  useWorkspaceStore.setState((state) => ({
    ...state,
    workspace: null,
    project: null
  }))
}

/**
 * Atualizar o nome do workspace no 'sidebar' da aplicação.
 */
const updateWorkspaceName = () => {
  return (
    useWorkspaceStore.getState().workspace?.name ??
    'navigation.workspaces.description'
  )
}

/**
 * Usando sem reatividade.
 */
export const WorkspaceStore = {
  getWorkspace: () => useWorkspaceStore.getState().workspace,
  getWorkspaceId: () => useWorkspaceStore.getState().workspace?._id ?? '',
  openWorkspace: (workspace: Workspace) => openWorkspace(workspace),
  closeWorkspace: () => closeWorkspace(),
  updateWorkspaceName: () => updateWorkspaceName()
}

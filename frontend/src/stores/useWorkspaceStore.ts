import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type Workspace = {
  id: string
  name: string
}

type WorkspaceStoreProps = {
  workspace: Workspace | null
  openWorkspace: (workspace: Workspace) => void
  closeWorkspace: () => void
}

export const useWorkspaceStore = create<WorkspaceStoreProps>()(
  devtools(
    persist<WorkspaceStoreProps>(
      () => ({
        workspace: null,
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
  useWorkspaceStore.setState((state) => ({ ...state, workspace }))
}

/**
 * Fechando um workspace.
 */
const closeWorkspace = () => {
  useWorkspaceStore.setState((state) => ({ ...state, workspace: null }))
}

/**
 * Usando sem reatividade.
 */
export const Workspace = {
  getWorkspace: () => useWorkspaceStore.getState().workspace,
  openWorkspace: (workspace: Workspace) => openWorkspace(workspace),
  closeWorkspace: () => closeWorkspace()
}
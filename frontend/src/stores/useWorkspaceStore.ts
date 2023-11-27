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
  closeWorkspace: (workspace?: Workspace) => void
  updateWorkspace: (workspace: Workspace) => void
}

export const useWorkspaceStore = create<WorkspaceStoreProps>()(
  devtools(
    persist<WorkspaceStoreProps>(
      () => ({
        workspace: null,
        project: null,
        openWorkspace: (workspace) => openWorkspace(workspace),
        closeWorkspace: (workspace?: Workspace) => closeWorkspace(workspace),
        updateWorkspace: (workspace) => updateWorkspace(workspace)
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
  toast.success(t('workspaces:actions.open_workspace', { ns: 'workspaces' }))
}

/**
 * Atualizar um workspace.
 */
const updateWorkspace = (workspace: Workspace) => {
  useWorkspaceStore.setState((state) => ({
    ...state,
    workspace
  }))
}

/**
 * Fechando um workspace.
 */
const closeWorkspace = (workspace?: Workspace) => {
  /**
   * Fechar o workspace somente se o '_id' do workspace passado por
   * parâmetro for igual ao do workspace atual.
   */
  if (workspace?._id) {
    const currentWorkspaceId = getWorkspaceId()

    if (currentWorkspaceId === workspace._id) {
      closeWorkspace()
    }
    return
  }

  /**
   * Fechando qualquer que seja o workspace se não enviado
   * o parâmetro 'workspace'.
   */
  useWorkspaceStore.setState((state) => ({
    ...state,
    workspace: null,
    project: null
  }))
}

/**
 * Pegando o 'id' do workspace.
 */
const getWorkspaceId = () => {
  return useWorkspaceStore.getState().workspace?._id ?? ''
}

/**
 * Pegando o 'id' do projeto.
 */
const getProjectId = () => {
  return useWorkspaceStore.getState().project?._id ?? ''
}

/**
 * Usando sem reatividade.
 */
export const WorkspaceStore = {
  getWorkspace: () => useWorkspaceStore.getState().workspace,
  getWorkspaceId: () => getWorkspaceId(),
  getProjectId: () => getProjectId(),
  openWorkspace: (workspace: Workspace) => openWorkspace(workspace),
  closeWorkspace: (workspace?: Workspace) => closeWorkspace(workspace),
  updateWorkspace: (workspace: Workspace) => updateWorkspace(workspace)
}

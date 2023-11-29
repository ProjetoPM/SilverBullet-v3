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
  onOpenWorkspace: (workspace: Workspace) => void
  onCloseWorkspace: (workspace?: Workspace) => void
  onUpdateWorkspace: (workspace: Workspace) => void
  onOpenProject: (project: Project) => void
  onCloseProject: (project?: Project) => void
}

export const useWorkspaceStore = create<WorkspaceStoreProps>()(
  devtools(
    persist<WorkspaceStoreProps>(
      () => ({
        workspace: null,
        project: null,
        onOpenWorkspace: (workspace) => onOpenWorkspace(workspace),
        onCloseWorkspace: (workspace?: Workspace) =>
          onCloseWorkspace(workspace),
        onUpdateWorkspace: (workspace) => onUpdateWorkspace(workspace),
        onOpenProject: (project) => onOpenProject(project),
        onCloseProject: (project?: Project) => onCloseProject(project)
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
const onOpenWorkspace = (workspace: Workspace) => {
  useWorkspaceStore.setState((state) => ({
    ...state,
    workspace,
    project: null
  }))
  toast.success(t('actions.open_workspace', { ns: 'workspaces' }))
}

/**
 * Abre um projeto.
 */
export const onOpenProject = (project: Project) => {
  useWorkspaceStore.setState((state) => ({
    ...state,
    project
  }))
  toast.success(t('actions.open_project', { ns: 'workspaces' }))
}

/**
 * Atualizar um workspace.
 */
const onUpdateWorkspace = (workspace: Workspace) => {
  useWorkspaceStore.setState((state) => ({
    ...state,
    workspace
  }))
}

/**
 * Fechando um workspace.
 */
const onCloseWorkspace = (workspace?: Workspace) => {
  /**
   * Fechar o workspace somente se o '_id' do workspace passado por
   * parâmetro for igual ao do workspace atual.
   */
  if (workspace?._id) {
    const currentWorkspaceId = getWorkspaceId()

    if (currentWorkspaceId === workspace._id) {
      onCloseWorkspace()
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
 * Fechando um projeto.
 */
const onCloseProject = (project?: Project) => {
  /**
   * Fechar o projeto somente se o '_id' do projeto passado por
   * parâmetro for igual ao do projeto atual.
   */
  if (project?._id) {
    const currentProjectId = getProjectId()

    if (currentProjectId === project._id) {
      onCloseProject()
    }
    return
  }

  /**
   * Fechando qualquer que seja o projeto se não enviado
   * o parâmetro 'project'.
   */
  useWorkspaceStore.setState((state) => ({
    ...state,
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
  onCloseWorkspace: (workspace?: Workspace) => onCloseWorkspace(workspace),
  onCloseProject: (project?: Project) => onCloseProject(project)
}

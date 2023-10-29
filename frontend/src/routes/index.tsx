import { createBrowserRouter } from 'react-router-dom'
import { AuthRoutes } from './pages/auth.routes'
import { ProjectRoutes } from './pages/project.routes'
import { WorkspaceRoutes } from './pages/workspace.routes'

/**
 * Criação do 'roteador' da aplicação, responsável por gerenciar
 * as rotas da aplicação.
 */
export const router = createBrowserRouter([
  AuthRoutes,
  WorkspaceRoutes,
  ProjectRoutes
])

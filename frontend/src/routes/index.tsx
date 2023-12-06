import { NextUIProvider } from '@/nextui.provider'
import { createBrowserRouter } from 'react-router-dom'
import { AuthRoutes } from './pages/auth.routes'
import { ProjectRoutes } from './pages/project.routes'
import { WeeklyEvaluationRoutes } from './pages/weekly-evaluation.routes'
import { WeeklyReportRoutes } from './pages/weekly-report.routes'
import { WorkspaceRoutes } from './pages/workspace.routes'

/**
 * Criação do 'roteador' da aplicação, responsável por gerenciar
 * as rotas da aplicação.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <NextUIProvider />,
    children: [
      AuthRoutes,
      WorkspaceRoutes,
      ProjectRoutes,
      WeeklyReportRoutes,
      WeeklyEvaluationRoutes
    ]
  }
])

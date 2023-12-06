/**
 * Rotas que serão utilizadas para realizar a navegação entre
 * as páginas da aplicação.
 */
export const frontend = {
  auth: {
    sign_in: {
      index: '/sign-in'
    },
    sign_up: {
      index: '/sign-up'
    }
  },
  workspaces: {
    index: '/workspaces',
    new: '/workspaces/new',
    edit: '/workspaces/:id/edit',
    delete: '/workspaces/:id/delete',
    users: {
      index: '/workspaces/:workspaceId/users',
      new: '/workspaces/:workspaceId/users/new',
      edit: '/workspaces/:workspaceId/users/:id/edit',
      delete: '/workspaces/:workspaceId/users/:id/delete'
    }
  },
  projects: {
    index: '/projects',
    new: '/projects/new',
    edit: '/projects/:id/edit',
    delete: '/projects/:id/delete'
  },
  weekly_evaluation: {
    index: '/weekly-evaluation',
    new: '/weekly-evaluation/new',
    edit: '/weekly-evaluation/:id/edit',
    delete: '/weekly-evaluation/:id/delete',
    metrics: {
      index: '/weekly-evaluation/:weeklyEvaluationId/metrics',
      new: '/weekly-evaluation/:weeklyEvaluationId/metrics/new',
      edit: '/weekly-evaluation/:weeklyEvaluationId/metrics/:id/edit',
      delete: '/weekly-evaluation/:weeklyEvaluationId/metrics/:id/delete'
    }
  },
  weekly_report: {
    index: '/weekly-report',
    new: '/weekly-report/new',
    edit: '/weekly-report/:id/edit',
    delete: '/weekly-report/:id/delete'
  },
  settings: {
    account: '/settings/my-account'
  }
}

export const backend = {
  workspaces: {
    baseUrl: '/workspaces'
  },
  projects: {
    baseUrl: '/projects'
  }
}

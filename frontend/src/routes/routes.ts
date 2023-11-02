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
    delete: '/workspaces/:id/delete'
  },
  projects: {
    index: '/projects',
    new: '/projects/new',
    edit: '/projects/:id/edit',
    delete: '/projects/:id/delete'
  },
  weekly_report: {
    index: '/weekly-report',
    new: '/weekly-report/new',
    edit: '/weekly-report/:id/edit',
    delete: '/weekly-report/:id/delete'
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

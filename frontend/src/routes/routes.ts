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
  }
}

export const backend = {
  workspaces: {
    baseUrl: '/workspaces'
  }
}

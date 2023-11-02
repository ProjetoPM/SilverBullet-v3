import { t } from 'i18next'

export class WorkspaceNotCreatedError extends Error {
  constructor() {
    super(t('workspace.not_created'))
    this.name = 'WorkspaceNotCreated'
  }
}

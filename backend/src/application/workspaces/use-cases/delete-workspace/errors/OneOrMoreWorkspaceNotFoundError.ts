import { t } from 'i18next'

export class OneOrMoreWorkspaceNotFoundError extends Error {
  constructor() {
    super(t('workspace.one_or_more_not_found'))
    this.name = 'OneOrMoreWorkspaceNotFoundError'
  }
}

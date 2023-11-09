import { PrismaProjectsRepository } from '@/application/projects/repositories/prisma/PrismaProjectsRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import {
  CheckUserRolesMiddleware,
  RolesMiddleware,
} from '@/infra/http/middlewares/check-roles'
import { adaptMiddleware } from '../../../../../core/infra/adapters/express-middleware-adapter'

/**
 * Verify if the user has the necessary permissions to access the route.
 * * This middleware must be used after the `makeGetCurrentWorkspaceAndProject` middleware.
 *
 * @param roles The roles that the user must have to access the route.
 * @example `project.use(checkRoles({ workspace: ['ADMIN'] }))`
 * @see makeGetCurrentWorkspaceAndProject
 */
export function makeCheckRoles(roles: RolesMiddleware) {
  const workpaceRepository = new PrismaWorkspacesRepository()
  const projectRepository = new PrismaProjectsRepository()

  return new CheckUserRolesMiddleware(
    workpaceRepository,
    projectRepository,
    roles,
  )
}

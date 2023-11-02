import { PrismaStakeholderEngagementPlansRepository } from '@/application/processes/stakeholder_engagement_plans/repositories/prisma/PrismaStakeholderEngagementPlansRepository'
import { CreateStakeholderEngagementPlan } from '@/application/processes/stakeholder_engagement_plans/use-cases/create-stakeholder-engagement-plan/create-stakeholder-engagement-plan'
import { CreateStakeholderEngagementPlanController } from '@/application/processes/stakeholder_engagement_plans/use-cases/create-stakeholder-engagement-plan/create-stakeholder-engagement-plan.controller'
import { Controller } from '@/core/infra/controller'

export function makeCreateStakeholderEngagementPlanController(): Controller {
  const prismaStakeholderEngagementPlansRepository =
    new PrismaStakeholderEngagementPlansRepository()

  const createStakeholderEngagementPlan = new CreateStakeholderEngagementPlan(
    prismaStakeholderEngagementPlansRepository,
  )

  return new CreateStakeholderEngagementPlanController(
    createStakeholderEngagementPlan,
  )
}

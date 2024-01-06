import { Router } from 'express'
import { auth } from './auth.routes'
import { invites } from './invites.routes'
import { projectCharter } from './project-charter.routes'
import { project } from './project.routes'
import { stakeholderEngagementPlan } from './stakeholder-engagement-plan.routes'
import { stakeholder } from './stakeholder.routes'
import { user } from './user.routes'
import { weeklyEvaluation } from './weekly-evaluation.routes'
import { workspace } from './workspace.routes'

export const router = Router()

router.use('/auth', auth)
router.use('/users', user)
router.use('/workspaces', workspace)
router.use('/projects', project)
router.use('/stakeholders', stakeholder)
router.use('/stakeholder-engagement-plans', stakeholderEngagementPlan)
router.use('/project-charters', projectCharter)
router.use('/weekly-evaluations', weeklyEvaluation)
router.use('/invites', invites)

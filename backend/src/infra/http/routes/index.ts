import { Router } from 'express'
import { auth } from './auth.routes'
import { workspace } from './workspace.routes'
import { project } from './project.routes'
import { stakeholder } from './stakeholder.routes'
import { stakeholderEngagementPlan } from './stakeholder-engagement-plan.routes'

export const router = Router()

router.use('/auth', auth)
router.use('/workspaces', workspace)
router.use('/projects', project)
router.use('/stakeholders', stakeholder)
router.use('/stakeholder-engagement-plans', stakeholderEngagementPlan)

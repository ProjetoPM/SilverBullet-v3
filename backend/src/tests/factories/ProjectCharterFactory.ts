import { ProjectCharter } from '@/application/processes/integration/initiating/project-charter/domain/project-charter'

type ProjectCharterOverrides = {
  projectName?: string
  highLevelProjectDescription?: string
  startDate?: Date
  endDate?: Date
  projectPurpose?: string
  measurableProjectObjectives?: string
  keyBenefits?: string
  highLevelRequirements?: string
  boundaries?: string
  overallProjectRisk?: string
  summaryMilestoneSchedule?: string
  preApprovedFinancialResources?: string
  projectApprovalRequirements?: string
  successCriteria?: string
  projectExitCriteria?: string
  signed?: false
  projectId: string
}
export class ProjectCharterFactory {
  static create(overrides: ProjectCharterOverrides) {
    const projectCharter = ProjectCharter.create({
      projectName: overrides.projectName || 'test-projectName',
      highLevelProjectDescription:
        overrides.highLevelProjectDescription ||
        'test-highLevelProjectDescription',
      startDate: overrides.startDate || new Date(),
      endDate:
        overrides.endDate ||
        new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 90),
      projectPurpose: overrides.projectPurpose || 'test-projectPurpose',
      measurableProjectObjectives:
        overrides.measurableProjectObjectives ||
        'test-measurableProjectObjectives',
      keyBenefits: overrides.keyBenefits || 'test-keyBenefits',
      highLevelRequirements:
        overrides.highLevelRequirements || 'test-highLevelRequirements',
      boundaries: overrides.boundaries || 'test-boundaries',
      overallProjectRisk:
        overrides.overallProjectRisk || 'test-overallProjectRisk',
      summaryMilestoneSchedule:
        overrides.summaryMilestoneSchedule || 'test-summaryMilestoneSchedule',
      preApprovedFinancialResources:
        overrides.preApprovedFinancialResources ||
        'test-preApprovedFinancialResources',
      projectApprovalRequirements:
        overrides.projectApprovalRequirements ||
        'test-projectApprovalRequirements',
      successCriteria: overrides.successCriteria || 'test-successCriteria',
      projectExitCriteria:
        overrides.projectExitCriteria || 'test-projectExitCriteria',
      signed: overrides.signed || false,
      projectId: overrides.projectId,
    })

    return projectCharter.value as ProjectCharter
  }
}

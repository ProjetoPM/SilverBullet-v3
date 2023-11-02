import { ProjectCharter as PersistenceProjectCharter } from '@prisma/client'
import { t } from 'i18next'
import { ProjectCharter } from '../domain/project-charter'

export class ProjectCharterMapper {
  static toDomain(raw: PersistenceProjectCharter) {
    const projectCharterOrError = ProjectCharter.create(
      {
        projectId: raw.project_id,
        projectName: raw.project_name,
        highLevelProjectDescription: raw.high_level_project_description,
        startDate: raw.start_date,
        endDate: raw.end_date,
        projectPurpose: raw.project_purpose,
        measurableProjectObjectives: raw.measurable_project_objectives,
        keyBenefits: raw.key_benefits,
        highLevelRequirements: raw.high_level_requirements,
        boundaries: raw.boundaries,
        overallProjectRisk: raw.overall_project_risk,
        summaryMilestoneSchedule: raw.summary_milestone_schedule,
        preApprovedFinancialResources: raw.pre_approved_financial_resources,
        projectApprovalRequirements: raw.project_approval_requirements,
        successCriteria: raw.success_criteria,
        projectExitCriteria: raw.project_exit_criteria,
        signed: raw.signed,
      },
      raw.id,
    )

    if (projectCharterOrError.isLeft()) {
      throw new Error(t('errors.invalid_stakeholder'))
    }

    return projectCharterOrError.value
  }

  static async toPersistence(projectCharter: ProjectCharter) {
    return {
      id: projectCharter.id,
      project_name: projectCharter.props.projectName,
      high_level_project_description:
        projectCharter.props.highLevelProjectDescription,
      start_date: projectCharter.props.startDate,
      end_date: projectCharter.props.endDate,
      project_purpose: projectCharter.props.projectPurpose,
      measurable_project_objectives:
        projectCharter.props.measurableProjectObjectives,
      key_benefits: projectCharter.props.keyBenefits,
      high_level_requirements: projectCharter.props.highLevelRequirements,
      boundaries: projectCharter.props.boundaries,
      overall_project_risk: projectCharter.props.overallProjectRisk,
      summary_milestone_schedule: projectCharter.props.summaryMilestoneSchedule,
      pre_approved_financial_resources:
        projectCharter.props.preApprovedFinancialResources,
      project_approval_requirements:
        projectCharter.props.projectApprovalRequirements,
      success_criteria: projectCharter.props.successCriteria,
      project_exit_criteria: projectCharter.props.projectExitCriteria,
      signed: projectCharter.props.signed,
      project_id: projectCharter.props.projectId,
    }
  }
}

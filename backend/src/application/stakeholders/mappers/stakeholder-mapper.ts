import { Stakeholder as PersistenceStakeholder } from '@prisma/client'
import { Stakeholder } from '../domain/stakeholder'
import { t } from 'i18next'
import TYPES from '../domain/types.enum'
import { ResolvedTestEnvironment } from 'vitest'
import ROLES from '../domain/roles.enum'

export class StakeholderMapper {
  static toDomain(raw: PersistenceStakeholder) {
    const StakeholderOrError = Stakeholder.create(
      {
        type: raw.type as unknown as TYPES,
        mainProjectRole: raw.main_project_role as unknown as ROLES,
        email: raw.email,
        organization: raw.organization,
        organizationPosition: raw.organization_position,
        mainProjectResponsibility: raw.main_project_responsibility,
        phone: raw.phone,
        workplace: raw.workplace,
        essentialRequirements: raw.essential_requirements,
        mainExpectations: raw.main_expectations,
        greaterInterestPhase: raw.greater_interest_phase,
        observations: raw.observations,
        userId: raw.user_id,
        projectId: raw.project_id,
      },
      raw.id,
    )

    if (StakeholderOrError.isLeft()) {
      throw new Error(t('errors.invalid_stakeholder'))
    }

    if (StakeholderOrError.isRight()) {
      return StakeholderOrError.value
    }
    return null
  }

  static async toPersistence(stakeholder: Stakeholder) {
    return {
      id: stakeholder.id,
      type: stakeholder.props.type,
      main_project_role: stakeholder.props.mainProjectRole,
      email: stakeholder.props.email,
      organization: stakeholder.props.organization,
      organization_position: stakeholder.props.organizationPosition,
      main_project_responsibility: stakeholder.props.mainProjectResponsibility,
      phone: stakeholder.props.phone,
      workplace: stakeholder.props.workplace,
      essential_requirements: stakeholder.props.essentialRequirements,
      main_expectations: stakeholder.props.mainExpectations,
      greater_interest_phase: stakeholder.props.greaterInterestPhase,
      observations: stakeholder.props.observations,
      user_id: stakeholder.props.userId,
      project_id: stakeholder.props.projectId,
    }
  }
}

import { Metric as PersistenceMetric } from '@prisma/client'
import { Workspace } from '../domain/workspace'
import { t } from 'i18next'
import { PlanTypes } from '../domain/plan-types.enum'
import { PlanStatuses } from '../domain/plan-statuses.enum'
import { Metric } from '../domain/metric'

export class MetricMapper {
  static toDomain(raw: PersistenceMetric) {
    const metricOrError = Metric.create(
      {
        name: raw.name,
        value: raw.value,
      },
      raw.id,
    )

    if (metricOrError.isLeft()) {
      throw new Error(t('errors.invalid_metric'))
    }

    return metricOrError.value
  }

  static async toPersistence(metric: Metric) {
    return {
      id: metric.id,
      name: metric.props.name,
      value: metric.props.value,
    }
  }
}

import { t as translate } from '@/utils/translate-text'
import { AlertCircle, Clock2, SearchCheck, Star, Users2 } from 'lucide-react'
import {
  FaBullhorn,
  FaMoneyBill,
  FaPeopleCarry,
  FaTrophy
} from 'react-icons/fa'
import { IoMdPricetags } from 'react-icons/io'

type fn = () => string

export type Areas = {
  id: string
  icon: JSX.Element
  name: fn
  description: string
  background?: string
  border?: string
  phases: {
    id: string
    name: fn
    description?: string
    badges: [string, string?]
    to?: string
  }[]
}

const t = (key: string) => translate(key, { ns: ['areas', 'phases'] })

export const dashboardItems: Areas[] = [
  {
    id: 'integration',
    icon: <Star className="w-6 h-6" />,
    name: t('integration.label'),
    description: 'integration.description',
    background: 'bg-pink-500 text-white',
    border: 'border-pink-500',
    phases: [
      {
        id: 'project-charter',
        name: t('project_charter'),
        description: 'description:project_charter',
        badges: ['initiating']
      },
      {
        id: 'business-case',
        name: t('business_case'),
        description: 'description:business_case',
        badges: ['initiating']
      },
      {
        id: 'benefits-management-plan',
        name: t('benefits_management_plan'),
        description: 'description:benefits_management_plan',
        badges: ['initiating']
      },
      {
        id: 'assumption-log',
        name: t('assumption_log'),
        description: 'description:assumption_log',
        badges: ['initiating']
      },
      {
        id: 'project-management-plan',
        name: t('project_management_plan'),
        description: 'description:project_management_plan',
        badges: ['planning']
      },
      {
        id: 'project-performance-and-monitoring-report',
        name: t('project_performance_and_monitoring_report'),
        description: 'description:project_performance_and_monitoring_report',
        badges: ['executing']
      },
      {
        id: 'deliverable-status',
        name: t('deliverable_status'),
        description: 'description:deliverable_status',
        badges: ['executing']
      },
      {
        id: 'work-performance-reports',
        name: t('work_performance_reports'),
        description: 'description:work_performance_reports',
        badges: ['executing']
      },
      {
        id: 'issue-log',
        name: t('issue_log'),
        description: 'description:issue_log',
        badges: ['executing']
      },
      {
        id: 'lesson-learned-register',
        name: t('lesson_learned_register'),
        description: 'description:lesson_learned_register',
        badges: ['executing']
      },
      {
        id: 'change-request',
        name: t('change_request'),
        description: 'description:change_request',
        badges: ['monitoring_and_controlling']
      },
      {
        id: 'change-log',
        name: t('change_log'),
        description: 'description:change_log',
        badges: ['monitoring_and_controlling']
      },
      {
        id: 'project-closure-term',
        name: t('project_closure_term'),
        description: 'description:project_closure_term',
        badges: ['closing']
      },
      {
        id: 'final-report',
        name: t('final_report'),
        description: 'description:final_report',
        badges: ['closing']
      }
    ]
  },
  {
    id: 'scope',
    icon: <SearchCheck className="w-6 h-6" />,
    name: t('scope.label'),
    description: 'scope.description',
    background: 'bg-green-800 text-white',
    border: 'border-green-600 dark:border-green-800',
    phases: [
      {
        id: 'requirements-management-plan',
        name: t('requirements_management_plan'),
        description: 'description:requirements_management_plan',
        badges: ['planning']
      },
      {
        id: 'scope-management-plan',
        name: t('scope_management_plan'),
        description: 'description:scope_management_plan',
        badges: ['planning']
      },
      {
        id: 'requirement-documentation',
        name: t('requirement_documentation'),
        description: 'description:requirement_documentation',
        badges: ['planning']
      },
      {
        id: 'project-scope-statement',
        name: t('project_scope_statement'),
        description: 'description:project_scope_statement',
        badges: ['planning']
      },
      {
        id: 'work-breakdown-structure',
        name: t('work_breakdown_structure'),
        description: 'description:work_breakdown_structure',
        badges: ['planning']
      }
    ]
  },
  {
    id: 'schedule',
    icon: <Clock2 className="w-6 h-6" />,
    name: t('schedule.label'),
    description: 'schedule.description',
    background: 'bg-yellow-900 text-white',
    border: 'border-yellow-600 dark:border-yellow-900',
    phases: [
      {
        id: 'schedule-management-plan',
        name: t('schedule_management_plan'),
        description: 'description:schedule_management_plan',
        badges: ['planning']
      },
      {
        id: 'activity-list',
        name: t('activity_list'),
        description: 'description:activity_list',
        badges: ['planning']
      },
      {
        id: 'earned-value-management',
        name: t('earned_value_management'),
        description: 'description:earned_value_management',
        badges: ['planning']
      },
      {
        id: 'schedule-network-diagram',
        name: t('schedule_network_diagram'),
        description: 'description:schedule_network_diagram',
        badges: ['planning']
      },
      {
        id: 'resource-requirements',
        name: t('resource_requirements'),
        description: 'description:resource_requirements',
        badges: ['planning']
      },
      {
        id: 'duration-estimates',
        name: t('duration_estimates'),
        description: 'description:duration_estimates',
        badges: ['planning']
      },
      {
        id: 'stakeholder-calendars',
        name: t('stakeholder_calendars'),
        description: 'description:stakeholder_calendars',
        badges: ['planning']
      }
    ]
  },
  {
    id: 'cost',
    icon: <FaMoneyBill className="w-6 h-6" />,
    name: t('cost.label'),
    description: 'cost.description',
    background: 'bg-blue-900 text-white',
    border: 'border-blue-600 dark:border-blue-900',
    phases: [
      {
        id: 'cost-management-plan',
        name: t('cost_management_plan'),
        description: 'description:cost_management_plan',
        badges: ['planning']
      },
      {
        id: 'cost-estimates',
        name: t('cost_estimates'),
        description: 'description:cost_estimates',
        badges: ['planning']
      }
    ]
  },
  {
    id: 'quality',
    icon: <FaTrophy className="w-6 h-6" />,
    name: t('quality.label'),
    description: 'quality.description',
    background: 'bg-cyan-600 text-white',
    border: 'border-cyan-600',
    phases: [
      {
        id: 'quality-management-plan',
        name: t('quality_management_plan'),
        description: 'description:quality_management_plan',
        badges: ['planning']
      },
      {
        id: 'product-quality-checklists',
        name: t('product_quality_checklists'),
        description: 'description:product_quality_checklists',
        badges: ['executing']
      },
      {
        id: 'quality-reports',
        name: t('quality_reports'),
        description: 'description:quality_reports',
        badges: ['monitoring_and_controlling']
      }
    ]
  },
  {
    id: 'resources',
    icon: <FaPeopleCarry className="w-6 h-6" />,
    name: t('resources.label'),
    description: 'resources.description',
    background: 'bg-purple-800 text-white',
    border: 'border-purple-300 dark:border-purple-800',
    phases: [
      {
        id: 'resource-management-plan',
        name: t('resource_management_plan'),
        description: 'description:resource_management_plan',
        badges: ['planning']
      },
      {
        id: 'resource-breakdown-structure',
        name: t('resource_breakdown_structure'),
        description: 'description:resource_breakdown_structure',
        badges: ['planning']
      },
      {
        id: 'team-performance-assessments',
        name: t('team_performance_assessments'),
        description: 'description:team_performance_assessments',
        badges: ['executing']
      }
    ]
  },
  {
    id: 'communication',
    icon: <FaBullhorn className="w-6 h-6" />,
    name: t('communication.label'),
    description: 'communication.description',
    background: 'bg-orange-500 text-white',
    border: 'border-orange-500',
    phases: [
      {
        id: 'communication-management-plan',
        name: t('communication_management_plan'),
        description: 'description:communication_management_plan',
        badges: ['planning']
      }
    ]
  },
  {
    id: 'risk',
    icon: <AlertCircle className="w-6 h-6" />,
    name: t('risk.label'),
    description: 'risk.description',
    background: 'bg-red-700 text-white',
    border: 'border-red-300 dark:border-red-700',
    phases: [
      {
        id: 'risk-management-plan',
        name: t('risk_management_plan'),
        description: 'description:risk_management_plan',
        badges: ['planning']
      },
      {
        id: 'risk-register',
        name: t('risk_register'),
        description: 'description:risk_register',
        badges: ['planning']
      },
      {
        id: 'general-project-risk-checklist',
        name: t('general_project_risk_checklist'),
        description: 'description:general_project_risk_checklist',
        badges: ['planning']
      }
    ]
  },
  {
    id: 'procurement',
    icon: <IoMdPricetags className="w-6 h-6" />,
    name: t('procurement.label'),
    description: 'procurement.description',
    background: 'bg-emerald-900 text-white',
    border: 'border-emerald-300 dark:border-emerald-900',
    phases: [
      {
        id: 'procurement-management-plan',
        name: t('procurement_management_plan'),
        description: 'description:procurement_management_plan',
        badges: ['planning']
      },
      {
        id: 'procurement-statement-of-work',
        name: t('procurement_statement_of_work'),
        description: 'description:procurement_statement_of_work',
        badges: ['planning']
      },
      {
        id: 'closed-procurement-documentation',
        name: t('closed_procurement_documentation'),
        description: 'description:closed_procurement_documentation',
        badges: ['monitoring_and_controlling']
      }
    ]
  },
  {
    id: 'stakeholders',
    icon: <Users2 className="w-6 h-6" />,
    name: t('stakeholders.label'),
    description: 'stakeholders.description',
    background: 'bg-sky-800 text-white',
    border: 'border-sky-300 dark:border-sky-800',
    phases: [
      {
        id: 'stakeholder-register',
        name: t('stakeholder_register'),
        description: 'description:stakeholder_register',
        badges: ['initiating']
      },
      {
        id: 'stakeholder-engagement-plan',
        name: t('stakeholder_engagement_plan'),
        description: 'description:stakeholder_engagement_plan',
        badges: ['planning']
      }
    ]
  }
]

import { usePageLayout } from '@/layout/PageLayoutProvider'
import { i18n } from 'i18next'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'
import { WeeklyReportData } from '../../weekly-report.schema'

export type SortItem = 'ASC' | 'DESC'

type ProcessesContextProps = {
  form: UseFormReturn<WeeklyReportData>
  array: UseFieldArrayReturn<WeeklyReportData>
  sorting: [Set<string>, Dispatch<SetStateAction<Set<SortItem>>>]
  t: i18n['t']
}

type ProcessesProviderProps = {
  value: Omit<ProcessesContextProps, 't' | 'sorting'>
  children: React.ReactNode
}

const ProcessesContext = createContext<ProcessesContextProps | null>(null)

export const ProcessesProvider = ({
  value,
  children
}: ProcessesProviderProps) => {
  const { t } = usePageLayout()
  const sorting = useState(new Set<SortItem>(['DESC']))

  return (
    <ProcessesContext.Provider value={{ ...value, t, sorting }}>
      {children}
    </ProcessesContext.Provider>
  )
}

export const useProcesses = () => {
  const context = useContext(ProcessesContext)

  if (!context) {
    throw new Error(
      'useProcessesContext must be used within a ProcessesProvider'
    )
  }

  return context
}

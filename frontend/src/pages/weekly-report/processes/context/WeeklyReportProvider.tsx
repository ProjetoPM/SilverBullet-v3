import { TFunction } from 'i18next'
import { createContext, useContext } from 'react'
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { WeeklyReportData } from '../../weekly-report.schema'

type ProcessesContextProps = {
  form: UseFormReturn<WeeklyReportData>
  array: UseFieldArrayReturn<WeeklyReportData>
  t: TFunction<'table', undefined>
}

type ProcessesProviderProps = {
  value: Omit<ProcessesContextProps, 't'>
  children: React.ReactNode
}

const ProcessesContext = createContext<ProcessesContextProps | null>(null)

export const ProcessesProvider = ({
  value,
  children
}: ProcessesProviderProps) => {
  const { t } = useTranslation('weekly-report')

  return (
    <ProcessesContext.Provider value={{ ...value, t }}>
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

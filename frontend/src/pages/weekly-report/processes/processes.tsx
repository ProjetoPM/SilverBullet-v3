import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { WeeklyReportData } from '../weekly-report.schema'
import { AddProcesses } from './actions/processes.add'
import { ProcessesItems } from './processes.items'
import { SortProcesses } from './actions/processes.sort'
import { ProcessesProvider } from './context/ProcessProvider'

type WeeklyReportProcessesProps = {
  form: UseFormReturn<WeeklyReportData>
}

export const WeeklyReportProcesses = ({ form }: WeeklyReportProcessesProps) => {
  const array = useFieldArray<WeeklyReportData>({
    control: form.control,
    name: 'processes'
  })

  return (
    <ProcessesProvider value={{ form, array }}>
      <section className="my-1.5 h-20 w-full bg-default-100/90 flex items-center gap-2 justify-between px-4 border border-success-400 dark:border-foreground-200 rounded-lg">
        <AddProcesses />
        <SortProcesses />
      </section>
      <section className="flex flex-col gap-4">
        <ProcessesItems />
      </section>
    </ProcessesProvider>
  )
}

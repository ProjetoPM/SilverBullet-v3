import { DefaultAnimate } from '@/components/ui/animation/DefaultAnimate'
import { cn } from '@nextui-org/react'
import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { WeeklyReportData } from '../weekly-report.schema'
import { AddProcesses } from './actions/processes.add'
import { SortProcesses } from './actions/processes.sort'
import { ProcessesProvider } from './context/WeeklyReportProvider'
import { ProcessItem } from './processes.item'

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
        {array.fields.map((field, index) => (
          <DefaultAnimate
            key={field.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={cn(
              'relative gap-3 border border-dashed rounded-md p-4 border-green-800 dark:bg-green-950/5'
            )}
          >
            <ProcessItem index={index} />
          </DefaultAnimate>
        ))}
      </section>
    </ProcessesProvider>
  )
}

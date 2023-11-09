import { DefaultAnimate } from '@/components/ui/animation/DefaultAnimate'
import { cn } from '@nextui-org/react'
import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { WeeklyReportData } from '../weekly-report.schema'
import { AddProcesses } from './actions/processes.add'
import { ProcessesProvider } from './context/WeeklyReportProvider'
import { ProcessItem } from './processes.item'

type WeeklyReportProcessesProps = {
  form: UseFormReturn<WeeklyReportData>
}

export const WeeklyReportProcesses = ({ form }: WeeklyReportProcessesProps) => {
  const array = useFieldArray({
    control: form.control,
    name: 'processes'
  })

  return (
    <ProcessesProvider value={{ form, array }}>
      <section className="my-1.5 h-20 w-full bg-default-100/90 flex items-center gap-2 justify-between px-4 border border-success-400 dark:border-foreground-200 rounded-lg">
        <AddProcesses />
      </section>
      <section className="flex flex-col gap-4">
        {array.fields.map((field, index) => (
          <DefaultAnimate
            key={field.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={cn(
              'relative gap-3 border border-dashed rounded-md p-4 border-green-900 dark:bg-green-950/5'
            )}
          >
            <ProcessItem index={index} />
          </DefaultAnimate>
        ))}
      </section>
    </ProcessesProvider>
  )
}

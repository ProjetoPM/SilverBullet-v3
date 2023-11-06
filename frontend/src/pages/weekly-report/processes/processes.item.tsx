import { GridLayout } from '@/components/ui/Grid'
import { RichEditor } from '@/components/ui/editor/RichEditor'
import { Chip } from '@nextui-org/react'
import { Trash, Upload, View } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { useProcesses } from './context/WeeklyReportProvider'
import { ProcessSelects } from './processes.selects'

type ProcessItemProps = {
  index: number
}

export const ProcessItem = ({ index }: ProcessItemProps) => {
  const { t, form } = useProcesses()

  return (
    <GridLayout cols="1">
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Chip size="sm" color="success" className="select-none">
            {t('process.process_number', { value: index + 1 })}
          </Chip>
        </div>
        <ProcessSelects index={index} />
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <fieldset>
            <Controller
              control={form.control}
              name={`processes.${index}.description`}
              render={({ field }) => (
                <RichEditor
                  label={t('tool_evaluation.label')}
                  placeholder={t('tool_evaluation.placeholder')}
                  errorMessage={form.formState.errors.toolEvaluation?.message}
                  limit={1000}
                  as="textarea-4"
                  {...field}
                />
              )}
            />
          </fieldset>
          <div className="flex gap-2" role="actions">
            <Upload />
            <Trash />
            <View />
          </div>
        </div>
      </div>
    </GridLayout>
  )
}

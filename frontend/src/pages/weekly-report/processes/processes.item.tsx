import { GridLayout } from '@/components/ui/Grid'
import { RichEditor } from '@/components/ui/editor/RichEditor'
import { Text } from '@/components/ui/label/Text'
import { Chip } from '@nextui-org/react'
import { Controller } from 'react-hook-form'
import { RemoveProcess } from './actions/processes.remove'
import { UploadProcess } from './actions/processes.upload'
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
        <div className="grid grid-cols-1 xs:grid-cols-[1fr_auto] gap-4">
          <fieldset>
            <Controller
              control={form.control}
              name={`processes.${index}.description`}
              render={({ field }) => (
                <RichEditor
                  label={t('description.label')}
                  placeholder={t('description.placeholder')}
                  errorMessage={
                    form.formState.errors.processes?.[index]?.description
                      ?.message
                  }
                  limit={1000}
                  as="textarea-5"
                  {...field}
                />
              )}
            />
          </fieldset>
          <div className="flex flex-col" role="actions">
            <Text text="Actions" isRequired />
            <div className="flex gap-2">
              <UploadProcess index={index} />
              <RemoveProcess index={index} />
            </div>
          </div>
        </div>
      </div>
    </GridLayout>
  )
}

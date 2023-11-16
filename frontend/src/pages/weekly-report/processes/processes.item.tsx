import { GridLayout } from '@/components/ui/GridLayout'
import { RichEditor } from '@/components/ui/editor/RichEditor'
import { Text } from '@/components/ui/label/Text'
import { Chip } from '@nextui-org/react'
import { Controller, FieldArrayWithId } from 'react-hook-form'
import { WeeklyReportData } from '../weekly-report.schema'
import { FilesProcess } from './actions/processes.files'
import { RemoveProcess } from './actions/processes.remove'
import { useProcesses } from './context/ProcessProvider'
import { ProcessSelects } from './processes.selects'
import toast from 'react-hot-toast'

type ProcessItemProps = {
  field: FieldArrayWithId<WeeklyReportData>
  index: number
}

export const ProcessItem = ({ field, index }: ProcessItemProps) => {
  const { t, form } = useProcesses()

  return (
    <GridLayout cols="1">
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Chip
            size="sm"
            color={field._id ? 'primary' : 'success'}
            className="select-none"
          >
            {t('process.process_number', {
              value: field._id?.split('-')?.[0] || field.id.split('-')?.[0]
            })}
          </Chip>
        </div>
        <ProcessSelects index={index} />
        <div className="grid grid-cols-1 xs:grid-cols-[1fr_auto] gap-4">
          <fieldset>
            <Controller
              control={form.control}
              name={`processes.${index}.description`}
              render={({ field }) => (
                <>
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
                </>
              )}
            />
          </fieldset>
          <div className="flex flex-col" role="actions">
            <Text size="sm" isRequired>
              Actions
            </Text>
            <div className="flex gap-2">
              <FilesProcess field={field} index={index} />
              <RemoveProcess index={index} />
            </div>
          </div>
        </div>
        <div>
          <Text>Files to upload</Text>
          <div className="flex flex-wrap gap-2 overflow-hidden hover:overflow-y-auto max-h-24">
            <Chip
              onClose={() => toast.success('Coming soon! 🚀', { id: 'chip' })}
              color={field._id ? 'primary' : 'success'}
              variant="flat"
            >
              Arquivo X
            </Chip>
          </div>
        </div>
      </div>
    </GridLayout>
  )
}

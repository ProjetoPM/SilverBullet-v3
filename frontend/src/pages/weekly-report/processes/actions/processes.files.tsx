import { Button } from '@nextui-org/react'
import { UploadIcon } from 'lucide-react'
import { ChangeEvent, useEffect, useMemo } from 'react'
import { FieldArrayWithId } from 'react-hook-form'
import { WeeklyReportDataWithId } from '../../weekly-report.schema'
import { useProcesses } from '../context/ProcessProvider'
import { useWeeklyReport } from '../context/WeeklyReportProvider'

type UploadProcess = {
  field: FieldArrayWithId<WeeklyReportDataWithId>
  index: number
}

export const FilesProcess = ({ field, index }: UploadProcess) => {
  const { form } = useProcesses()
  const { images, addImages } = useWeeklyReport()

  const filesFolder = useMemo(() => {
    return field.filesFolder ?? field.id
  }, [field])

  useEffect(() => {
    form.setValue(`processes.${index}.filesFolder`, filesFolder)
  }, [form, filesFolder, index])

  const handleUpload = () => {
    document.getElementById(`processes.${index}.hidden`)?.click()
  }

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) {
      return
    }

    addImages(filesFolder, files)
    form.setValue(`processes.${index}.filesFolder`, filesFolder)
  }

  return (
    <>
      <input
        id={`processes.${index}.hidden`}
        type="file"
        multiple
        accept="image/*, application/pdf"
        className="hidden"
        {...form.register(`processes.${index}.filesFolder`)}
        onChange={onChangeFile}
        onFocus={() =>
          document.getElementById(`processes.${index}.filesFolder`)?.focus()
        }
      />
      <Button
        id={`processes.${index}.filesFolder`}
        type="button"
        color="default"
        variant="flat"
        onPress={handleUpload}
        isIconOnly
      >
        <UploadIcon className="w-5 h-5" />
      </Button>
      {images
        .filter((item) => item.filesFolder === filesFolder)
        .map((item, index) => (
          <div key={index}>
            {item.files.map((file) => (
              <div key={file.name}>{file.name}</div>
            ))}
          </div>
        ))}
    </>
  )
}

import { Button } from '@nextui-org/react'
import { UploadIcon } from 'lucide-react'
import { useProcesses } from '../context/WeeklyReportProvider'

type UploadProcess = {
  index: number
}

export const UploadProcess = ({ index }: UploadProcess) => {
  const { form } = useProcesses()

  const handleUpload = () => {
    document.getElementById(`processes.${index}.filesFolder`)?.click()
  }

  return (
    <>
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
      <input
        type="hidden"
        id={`processes.${index}.hidden`}
        {...form.register(`processes.${index}.filesFolder`)}
        onFocus={() =>
          document.getElementById(`processes.${index}.filesFolder`)?.focus()
        }
      />
    </>
  )
}

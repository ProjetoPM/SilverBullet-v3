import { DefaultAnimate } from '@/@components/UI/Animation/DefaultAnimate'
import { cn } from '@nextui-org/react'
import { useProcesses } from './context/ProcessProvider'
import { ProcessItem } from './processes.item'

export const ProcessesItems = () => {
  const { array } = useProcesses()

  return (
    <>
      {array.fields.map((field, index) => (
        <DefaultAnimate
          key={field.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className={cn('relative gap-3 border border-dashed rounded-md p-4', {
            'border-green-800 bg-green-950/[.01]': !field._id,
            'border-blue-700 bg-blue-950/[.01]': field._id
          })}
        >
          <ProcessItem field={field} index={index} />
        </DefaultAnimate>
      ))}
    </>
  )
}

import { init, isCuid } from '@paralleldrive/cuid2'

const cuid = init({
  length: 10
})

const generateId = () => {
  return cuid()
}

const isCuidId = (id: string) => {
  return isCuid(id)
}

export const Generate = {
  id: generateId,
  isCuid: isCuidId
}

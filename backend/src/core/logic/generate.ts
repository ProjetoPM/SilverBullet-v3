import { init, isCuid } from '@paralleldrive/cuid2'

const cuid = init({
  length: 10,
})

export abstract class Generate {
  static id(): string {
    return cuid()
  }

  static isCuid(id: string): boolean {
    return isCuid(id)
  }
}

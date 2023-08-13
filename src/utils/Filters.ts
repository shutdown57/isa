import { QSelect } from 'quasar'
import { useStore } from 'src/store'

type FilterFunction = (inputValue: string, doneFn: (callbackFn: () => void, afterFn?: ((ref: QSelect) => void) | undefined) => void, abortFn: () => void) => void

export class FilterSelect {
  private readonly store = useStore()
  private readonly storeSearch: string
  private readonly storeGet: string

  constructor (storeGet: string, storeSearch: string) {
    this.storeGet = storeGet
    this.storeSearch = storeSearch
  }

  create (): FilterFunction {
    return async (needle: string, update: CallableFunction): Promise<void> => {
      try {
        if (needle !== '') {
          update(async () => {
            await this.store.dispatch(this.storeSearch, { needle: needle.toLowerCase() })
          })
        }
        update(async () => {
          await this.store.dispatch(this.storeGet)
        })
      } catch (err: any) {
        console.error(err)
      }
    }
  }
}

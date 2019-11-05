import { CoverageData } from './CoverageData'
import { EventEmitter } from 'events'


export interface CoverageAndResult<T={}> {
  coverage: CoverageData<T>
  passed: boolean
}

export interface Importer<T={}> extends EventEmitter {
  emit(event: 'data', data: CoverageAndResult<Partial<T>>): boolean
  emit(event: 'end'): boolean

  on(event: 'data', handler: (data: CoverageAndResult<Partial<T>>) => void): this
  on(event: 'end', handler: () => void): this

  once(event: 'data', handler: (data: CoverageAndResult<Partial<T>>) => void): this
  once(event: 'end', handler: () => void): this

  off(event: 'data', handler: (data: CoverageAndResult<Partial<T>>) => void): this
  off(event: 'end', handler: () => void): this
}

/**
 * Base class for all importers
 */
export class Importer<T={}> extends EventEmitter {
  /**
   * Import coverage data and test result from somewhere
   * @param pathPrefix
   */
  public async *importAsIterator(pathPrefix: string): AsyncGenerator<CoverageAndResult<Partial<T>>> {
    throw new Error('Not implemented')
  }

  /**
   * Import coverage data and test result from somewhere
   * 
   * Note that coverage data and result will be delivered by `data` event, and
   * a `end` event will be emitted when the import process is done
   * @param pathPrefix
   */
  public import(pathPrefix: string): void {
    throw new Error('Not implemented')
  }
}

export default Importer

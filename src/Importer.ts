import { EventBarrier } from 'unlib.js/build/Sync/EventBarrier'
import { CoverageData } from './CoverageData'


export interface CoverageAndResult<T={}> {
  coverage: CoverageData<T>
  passed: boolean
}

/**
 * Base class for all importers
 */
export class Importer extends EventBarrier {
  /**
   * Import coverage data and test result from somewhere
   * @param pathPrefix
   */
  public async *import<T={}>(pathPrefix: string): AsyncGenerator<CoverageAndResult<Partial<T>>> {
    throw new Error('Not implemented')
  }
}

export default Importer

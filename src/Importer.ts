import { EventBarrier } from 'unlib.js/build/Sync/EventBarrier'
import { CoverageData } from './CoverageData'


export interface CoverageAndResult {
  coverage: CoverageData
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
  public async *import(pathPrefix: string): AsyncGenerator<CoverageAndResult> {
    throw new Error('Not implemented')
  }
}

export default Importer

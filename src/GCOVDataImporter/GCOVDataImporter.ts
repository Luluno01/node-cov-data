import * as path from 'path'
import { readdir as _readdir } from 'fs'
import { promisify } from 'util'
import { load as loadJSON } from 'unlib.js/build/JSON'
import { CoverageData } from '../CoverageData'
import { GCOVData } from './GCOVData'
import Importer, { CoverageAndResult } from '../Importer'
const readdir = promisify(_readdir)


export class GCOVDataImporter extends Importer {
  /**
   * Whether the import process is done
   */
  protected done = false

  /**
   * Convert `GCOVData` to `CoverageData` (standard format)
   * @param gcov GCOV data
   */
  protected static gcovToFileResult(gcov: GCOVData): CoverageData {
    return gcov.files.map(({ file, functions, lines }) => {
      return {
        file,
        functions: functions.map(({ execution_count: count, start_line: lineNo, demangled_name: name }) => {
          return {
            count,
            lineNo,
            name
          }
        }),
        lines: lines.map(({ line_number: lineNo, count, function_name: functionName }) => {
          return {
            count,
            lineNo,
            functionName 
          }
        })
      }
    })
  }

  /**
   * The real import method (uses `EventBarrier` to implement an asynchronous
   * generator)
   * 
   * @param pathPrefix Prefix of paths to the JSON files generated by GCOV
   * (with `--json-format` flag) and their corresponding result files 
   */
  protected async doImport(pathPrefix: string) {
    const base = path.dirname(pathPrefix)
    const prefix = path.basename(pathPrefix)
    const reg = new RegExp(`^${prefix.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\.(\\d+)\\.(gcov|result)\\.json$`)
    const buffer: Map<string, GCOVData | boolean> = new Map
    await Promise.all((await readdir(base)).map(async name => {
      const match = reg.exec(name)
      if(match) {
        const [ , testIndex, type ] = match
        let gcovOrResult: GCOVData | boolean
        const resultOrGcov: boolean | GCOVData = await loadJSON(path.join(base, name))()
        if((gcovOrResult = buffer.get(testIndex)) != undefined) {
          if(type == 'gcov') {
            this.notify('data', {
              coverage: GCOVDataImporter.gcovToFileResult(resultOrGcov as GCOVData),
              passed: gcovOrResult as boolean
            } as CoverageAndResult)
          } else {  // type == 'result'
            this.notify('data', {
              coverage: GCOVDataImporter.gcovToFileResult(gcovOrResult as GCOVData),
              passed: resultOrGcov as boolean
            } as CoverageAndResult)
          }
        } else {
          buffer.set(testIndex, resultOrGcov)
        }
      }
    }))
    // TODO: Warn if buffer is non-empty
    buffer.clear()
    this.done = true
  }

  /**
   * Import coverage data and test result from JSON files and result files
   * 
   * E.g. Given the following directory tree
   * 
   * ```
   * .
   * ├── test.cc.0.gcov.json
   * ├── test.cc.0.result.json
   * ├── test.cc.1.gcov.json
   * ├── test.cc.1.result.json
   * ├── test.cc.2.gcov.json
   * └── test.cc.2.result.json
   * ```
   * 
   * The `pathPrefix` `./test.cc` will load all the `.gcov.json` files and
   * `.result.json` files above
   * 
   * @param pathPrefix Prefix of paths to the JSON files generated by GCOV
   * (with `--json-format` flag) and their corresponding result files
   */
  public async *import<T={}>(pathPrefix: string) {
    this.done = false
    this.doImport(pathPrefix).catch(err => this.abort('data', err))
    while(!this.done) {
      yield (await this.waitFor('data')) as CoverageAndResult<Partial<T>>
    }
  }
}

export default GCOVDataImporter

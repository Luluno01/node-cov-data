/**
 * The output of GCOV JSON file
 * 
 * See [gcc-gnu.org](https://gcc.gnu.org/onlinedocs/gcc/Invoking-Gcov.html)
 * for more details
 */
export interface GCOVData {
  /**
   * Working directory where a compilation unit was compiled
   */
  current_working_directory: string
  /**
   * Name of the data file (GCDA)
   */
  data_file: string
  /**
   * Semantic version of the format
   */
  format_version: string
  /**
   * Version of the GCC compiler
   */
  gcc_version: string
  files: GCOVFileDetail[]
}

export interface GCOVFileDetail {
  /**
   * Name of the source file
   */
  file: string
  functions: GCOVFunctionDetail[]
  lines: GCOVLineDetail[]
}

export interface GCOVFunctionDetail {
  /**
   * Number of blocks that are in the function
   */
  blocks: number
  /**
   * Number of executed blocks of the function
   */
  blocks_executed: number
  /**
   * Demangled name of the function
   */
  demangled_name: string
  /**
   * Column in the source file where the function ends
   */
  end_column: number
  /**
   * Line in the source file where the function ends
   */
  end_line: number
  /**
   * Number of executions of the function
   */
  execution_count: number
  /**
   * Name of the function
   */
  name: string
  /**
   * Column in the source file where the function begins
   */
  start_column: number
  /**
   * Line in the source file where the function begins
   */
  start_line: number
}

export interface GCOVLineDetail {
  /**
   * Branches are present only with `-b` option
   */
  branches: GCOVBranchDetail[]
  /**
   * Number of executions of the line
   */
  count: number
  /**
   * Line number
   */
  line_number: number
  /**
   * Flag whether the line contains an unexecuted block (not all statements on
   * the line are executed)
   */
  unexecuted_block: number
  /**
   * A name of a function this `line` belongs to (for a line with an inlined
   * statements can be not set)
   */
  function_name?: string | null
}

export interface GCOVBranchDetail {
  /**
   * Number of executions of the branch
   */
  count: number
  /**
   * `true` when the branch is a fall through branch
   */
  fallthrough: boolean
  /**
   * `true` when the branch is an exceptional branch
   */
  throw: boolean
}

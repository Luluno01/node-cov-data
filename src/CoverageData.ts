export interface TarantulaResult {
  passed: number
  failed: number
  suspiciousness: number
  rank: number
}

export interface LineCoverageData {
  count: number
  lineNo: number
  functionName?: string | null
}

export interface FunctionCoverageData {
  count: number
  lineNo: number
  name: string
}

export interface FileCoverageData {
  file: string
  functions: FunctionCoverageData[]
  lines: LineCoverageData[]
}

export type LineResult = LineCoverageData & Partial<TarantulaResult>
export type FunctionResult = FunctionCoverageData & Partial<TarantulaResult>

export interface FileResult extends FileCoverageData {
  functions: FunctionResult[]
  lines: LineResult[]
}

export type CoverageData = FileResult[]

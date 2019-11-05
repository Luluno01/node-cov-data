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

export type CoverageData = FileCoverageData[]

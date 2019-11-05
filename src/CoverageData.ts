export interface PureLineCoverageData {
  count: number
  lineNo: number
  functionName?: string | null
}

export type LineCoverageData<T={}> = PureLineCoverageData & T

export interface PureFunctionCoverageData {
  count: number
  lineNo: number
  name: string
}

export type FunctionCoverageData<T={}> = PureFunctionCoverageData & T

export interface PureFileCoverageData {
  file: string
  functions: PureFunctionCoverageData[]
  lines: PureLineCoverageData[]
}

export interface FileCoverageData<T={}> extends PureFileCoverageData {
  functions: FunctionCoverageData<T>[]
  lines: LineCoverageData<T>[]
}

export type CoverageData<T={}> = FileCoverageData<T>[]

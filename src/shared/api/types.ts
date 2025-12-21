export type BackendErrorMessage = {
  timestamp: string
  path: string
  message: string
  extensions: Extensions[]
  code: string
}

export type Extensions = {
  key: string
  message: string
}

export type BackendErrorResponse = {
  errorsMessages: BackendErrorMessage[]
}

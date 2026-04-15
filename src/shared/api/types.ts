import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

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

// export type BackendErrorResponse = {
//   errorsMessages: BackendErrorMessage[]
// }

export type BackendErrorResponse = BackendErrorMessage[]

export type RtkQueryError = {
  error: FetchBaseQueryError
  isUnhandledError: boolean
  meta: {
    request: Request
    response: Response
  }
}

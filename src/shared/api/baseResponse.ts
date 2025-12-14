export type BaseResponse<D = {}> = {
  data: D
  extensions: {
    key: string
    message: string
  }[]
  resultCode: number
}

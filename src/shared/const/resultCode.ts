export const resultCode = {
  BAD_REQUEST: 400,
  CONFLICT: 409,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  SUCCESS: 200,
  TOO_MANY: 429,
  UNAUTHORIZED: 401,
} as const

export type ResultCodeTypes = (typeof resultCode)[keyof typeof resultCode]

export type AuthSchema = {
  authMeData: { userName?: string } & UserType
}
type UserType = {
  email?: string | undefined
  userId: string | null
  userName?: string | undefined
  isActive?: boolean
}

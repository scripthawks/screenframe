import { BaseResponse } from "@/shared"

export type CreatePostResponseData = {
  id: string
  authorName: string
  authorId: string
  description: string
  imageUrl: string[]
  createdAt: string
}

export type CreatePostResponse = BaseResponse<CreatePostResponseData>
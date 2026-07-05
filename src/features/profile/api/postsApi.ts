import { baseApi } from '@/shared'
import { CreatePostResponse } from './types/createPostResponse'
import { CreatePostDto } from './types/createPostDto'

const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createPost: build.mutation<CreatePostResponse, CreatePostDto>({
      query: ({ files, description }) => {
        const formData = new FormData()

        files.forEach((f) => {
          formData.append(`files`, f, f.name)
        })

        if (description) {
          formData.append('description', description)
        }

        return {
          body: formData,
          method: 'POST',
          url: '/post',
        }
      },
      invalidatesTags: ['Posts'],
    }),
  }),
  overrideExisting: false,
})

export const { useCreatePostMutation } = postsApi
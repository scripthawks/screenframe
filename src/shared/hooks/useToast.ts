import { Toast } from '@/shared'

export const useToast = (isSuccess: boolean, error?: any, isSettings?: boolean) => {
  if (isSuccess) {
    Toast({ text: isSettings ? 'Your settings are saved' : 'Success', type: 'success' })
  }
  if (error) {
    Toast({ text: error, type: 'error' })
  }
}

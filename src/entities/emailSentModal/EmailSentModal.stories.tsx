import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { EmailSentModal } from '@/entities/emailSentModal'
const meta = {
  component: EmailSentModal,
  tags: ['autodocs'],
  title: 'Components/EmailSentModal',
} satisfies Meta<typeof EmailSentModal>

export default meta
type Story = StoryObj<typeof EmailSentModal>

export const EmailSentModalStory: Story = {
  args: {
    email: 'test@test.com',
  },
}

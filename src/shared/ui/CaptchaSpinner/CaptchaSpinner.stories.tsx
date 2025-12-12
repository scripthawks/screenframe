import { CaptchaSpinner } from '@/shared'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  component: CaptchaSpinner,
  tags: ['autodocs'],
  title: 'Components/CaptchaSpinner',
  args: {},
} satisfies Meta<typeof CaptchaSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Loading: Story = {}

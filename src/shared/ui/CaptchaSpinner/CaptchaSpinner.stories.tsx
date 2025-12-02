import { type Meta, type StoryObj } from '@storybook/nextjs-vite'
import { CaptchaSpinner } from '@/shared/ui'

const meta = {
  component: CaptchaSpinner,
  tags: ['autodocs'],
  title: 'Components/UI/CaptchaSpinner',
  args: {},
} satisfies Meta<typeof CaptchaSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Loading: Story = {}

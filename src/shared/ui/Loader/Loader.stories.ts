import { Loader } from '@/shared'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  component: Loader,
  tags: ['autodocs'],
  title: 'Components/Loader',
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof Loader>

export const LoaderStory: Story = {
  args: {},
}

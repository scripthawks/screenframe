import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from '@/widgets/sidebar'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof Sidebar>

export const DesktopSidebar: Story = {
  args: {
    isMobile: false,
  },
}

export const MobileSidebar: Story = {
  args: {
    isMobile: true,
  },
}

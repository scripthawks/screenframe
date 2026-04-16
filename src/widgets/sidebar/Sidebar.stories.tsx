import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Sidebar } from '@/widgets/sidebar'

const meta = {
  component: Sidebar,
  tags: ['autodocs'],
  title: 'Components/Sidebar',
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

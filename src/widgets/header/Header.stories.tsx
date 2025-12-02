import { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Header } from './Header'

const meta: Meta = {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    is_auth: {
      control: 'boolean',
      description: 'Показывает, авторизован ли пользователь',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Authorized: Story = {
  args: {
    is_auth: true,
  },
}

export const NotAuthorized: Story = {
  args: {
    is_auth: false,
  },
}

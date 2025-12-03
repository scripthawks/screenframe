import { TextField } from '@/shared'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'User name',
    variant: 'text',
  },
}

export const Error: Story = {
  args: {
    error: 'Error message',
    label: 'User name',
    variant: 'text',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'User name',
    variant: 'text',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    variant: 'password',
  },
}

export const PasswordError: Story = {
  args: {
    error: 'Error text',
    label: 'Password',
    variant: 'password',
  },
}

export const PasswordDisabled: Story = {
  args: {
    disabled: true,
    label: 'Password',
    variant: 'password',
  },
}

export const Search: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'search',
  },
}

export const SearchError: Story = {
  args: {
    error: 'Text error',
    placeholder: 'Search...',
    variant: 'search',
  },
}

export const SearchDisabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Search...',
    variant: 'search',
  },
}

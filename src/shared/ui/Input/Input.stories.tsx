import { Search } from '@/shared/assets/icons'
import { Input } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof Input> = {
  args: {
    placeholder: 'Введите текст...',
  },
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
}

export default meta

type Story = StoryObj<typeof Input>

// 1. Email Input
export const EmailInput: Story = {
  args: {
    label: 'Email',
    placeholder: 'Введите email',
    variant: 'email',
  },
}

// 2. Password Input
export const PasswordInput: Story = {
  args: {
    label: 'Пароль',
    placeholder: 'Введите пароль',
    variant: 'password',
  },
}

// 3. Search Input
export const SearchInput: Story = {
  args: {
    label: 'Поиск',
    placeholder: 'Поиск...',
    startIcon: <Search />,
    variant: 'search',
  },
}

// 4. Error Input
export const ErrorInput: Story = {
  args: {
    defaultValue: 'user@example',
    error: 'Некорректный email',
    label: 'Email',
    variant: 'email',
  },
}

// 5. Disabled Input
export const DisabledInput: Story = {
  args: {
    disabled: true,
    label: 'Пароль',
    placeholder: 'Введите пароль',
    variant: 'password',
  },
}

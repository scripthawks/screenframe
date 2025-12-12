import { Search } from '@/shared/assets/icons'
import { Input } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    placeholder: 'Введите текст...',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Input>

// 1. Email Input
export const EmailInput: Story = {
  args: {
    label: 'Email',
    variant: 'email',
    placeholder: 'Введите email',
  },
}

// 2. Password Input
export const PasswordInput: Story = {
  args: {
    label: 'Пароль',
    variant: 'password',
    placeholder: 'Введите пароль',
  },
}

// 3. Search Input
export const SearchInput: Story = {
  args: {
    label: 'Поиск',
    variant: 'search',
    placeholder: 'Поиск...',
    startIcon: <Search />,
  },
}

// 4. Error Input
export const ErrorInput: Story = {
  args: {
    label: 'Email',
    variant: 'email',
    error: 'Некорректный email',
    defaultValue: 'user@example',
  },
}

// 5. Disabled Input
export const DisabledInput: Story = {
  args: {
    label: 'Пароль',
    variant: 'password',
    placeholder: 'Введите пароль',
    disabled: true,
  },
}

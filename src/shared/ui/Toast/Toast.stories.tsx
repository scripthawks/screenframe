import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { useCallback } from 'react'

import { Button, Toast } from '@/shared'

import 'react-toastify/dist/ReactToastify.css'

type ToastType = 'success' | 'error'
type ToastVariantProps = {
  title: string
  text: string
  type: ToastType
}

const ToastButton = ({ text, title, type }: ToastVariantProps) => {
  const handleClick = useCallback(() => {
    Toast({ text, type })
  }, [text, type])

  return (
    <>
      <Button onClick={handleClick}>{title}</Button>
    </>
  )
}

const meta: Meta<typeof ToastButton> = {
  argTypes: {
    text: { control: 'text' },
  },
  component: ToastButton,
  tags: ['autodocs'],
  title: 'Components/Toast',
}

export default meta
type Story = StoryObj<typeof ToastButton>

export const Error: Story = {
  args: {
    text: 'Server is not available',
    title: 'Show Error Toast',
    type: 'error',
  },
  name: 'Error Toast',
}

export const Success: Story = {
  args: {
    text: 'Your settings are saved',
    title: 'Show Success Toast',
    type: 'success',
  },
  name: 'Success Toast',
}

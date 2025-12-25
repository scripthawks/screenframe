import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { useState } from 'react'

import { Button, ModalStorybook, Typography } from '@/shared'

const meta: Meta<typeof ModalStorybook> = {
  argTypes: {
    modalSize: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
    open: { control: 'boolean' },
  },
  component: ModalStorybook,
  render: args => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Открыть</Button>
        <ModalStorybook
          {...args}
          actionButtonName={'Close'}
          modalSize={args.modalSize || 'medium'}
          onAction={() => setIsOpen(false)}
          open={isOpen}
          title={args.title || 'Заголовок'}
        >
          <Typography variant={'regularText16'}>Контент модалки</Typography>
        </ModalStorybook>
      </>
    )
  },
  tags: ['autodocs'],
  title: 'Components/Modal',
}

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = { args: { modalSize: 'small', title: 'Малая' } }
export const Medium: Story = { args: { modalSize: 'medium', title: 'Средняя' } }
export const Large: Story = { args: { modalSize: 'large', title: 'Большая' } }

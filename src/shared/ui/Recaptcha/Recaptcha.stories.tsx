import { useState } from 'react'

import { Recaptcha } from '@/shared'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  component: Recaptcha,
  tags: ['autodocs'],
  title: 'Components/Recaptcha',
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const Controlled: Story = {
  render: args => {
    const [status, setStatus] = useState<
      'idle' | 'pending' | 'verified' | 'error' | 'expired' | 'notVerified'
    >('idle')

    const handleVerify = () => {
      setStatus('pending')
      setTimeout(() => {
        const random = Math.random()

        if (random > 0.7) {
          setStatus('verified')
        } else if (random > 0.4) {
          setStatus('notVerified')
        } else if (random > 0.2) {
          setStatus('expired')
        }
      }, 2000)
    }

    return (
      <Recaptcha {...args} isStatus={status} label={'I’m not a robot'} onVerify={handleVerify} />
    )
  },
}

export const Pending: Story = {
  args: {
    isStatus: 'pending',
    label: 'I’m not a robot',
  },
}

export const Expired: Story = {
  args: {
    isStatus: 'expired',
    label: 'I’m not a robot',
  },
}

export const NotVerified: Story = {
  args: {
    isStatus: 'notVerified',
    label: 'I’m not a robot',
  },
}

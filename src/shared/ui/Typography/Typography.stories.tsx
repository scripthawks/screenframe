import { Typography } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: {
    children: 'Пример текста',
  },
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {
  args: {
    as: 'p',
  },
}

export const Large: Story = {
  args: {
    as: 'p',
    variant: 'large',
  },
}

export const H1: Story = {
  args: {
    as: 'h1',
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    as: 'h3',
    variant: 'h3',
  },
}

export const RegularText16: Story = {
  args: {
    as: 'p',
    variant: 'regularText16',
  },
}

export const BoldText16: Story = {
  args: {
    as: 'p',
    variant: 'boldText16',
  },
}

export const RegularText14: Story = {
  args: {
    as: 'p',
    variant: 'regularText14',
  },
}

export const MediumText14: Story = {
  args: {
    as: 'p',
    variant: 'mediumText14',
  },
}

export const BoldText14: Story = {
  args: {
    as: 'p',
    variant: 'boldText14',
  },
}

export const RegularText12: Story = {
  args: {
    as: 'p',
    variant: 'regularText12',
  },
}

export const SemiBoldText12: Story = {
  args: {
    as: 'p',
    variant: 'semiBoldText12',
  },
}

export const RegularLink: Story = {
  args: {
    as: 'a',
    variant: 'regularLink',
  },
}

export const SmallLink: Story = {
  args: {
    as: 'a',
    variant: 'smallLink',
  },
}

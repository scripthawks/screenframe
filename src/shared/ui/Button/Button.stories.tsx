import { FlagUnitedKingdom, LogOut, SettingsOutline } from '@/shared/assets/icons'
import { Button, Typography } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from '@vitest/spy'

const meta: Meta = {
  args: {
    children: 'Button',
    onClick: fn(),
  },
  argTypes: {
    children: {
      control: 'text',
    },
    variant: {
      color: { control: 'color' },
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'text', 'withIcon'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    onClick: fn(),
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    ...Primary.args,
    children: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Outlined: Story = {
  args: {
    ...Primary.args,
    children: 'Outlined Button',
    variant: 'outlined',
  },
}

export const FullWidth: Story = {
  args: {
    ...Primary.args,
    children: 'Full Width Button',
    className: 'fullWidthButton',
    fullWidth: true,
    variant: 'outlined',
  },
}

export const Text: Story = {
  ...Primary.args,
  args: {
    children: 'Text Button',
    variant: 'text',
  },
}

export const Disabled: Story = {
  ...Primary.args,
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}

export const ButtonWithIcon: Story = {
  ...Primary.args,
  args: {
    text: 'English',
    variant: 'withIcon',
  },
  render: args => (
    <Button asChild {...args}>
      <a href={'#'}>
        <FlagUnitedKingdom />
        {args.text}
      </a>
    </Button>
  ),
}

export const Back: Story = {
  ...Primary.args,
  args: {
    text: 'LogOut',
    variant: 'withIcon',
  },
  render: args => (
    <Button asChild {...args}>
      <a href={'#'}>
        <LogOut />
        {args.text}
      </a>
    </Button>
  ),
}

export const TextWithIcon: Story = {
  ...Primary.args,
  args: {
    text: 'Settings',
    variant: 'withIcon',
  },
  render: args => (
    <Button asChild {...args}>
      <a href={'#'}>
        <SettingsOutline />
        <Typography as={'span'} style={{ color: 'inherit' }} variant={'h3'}>
          {args.text}
        </Typography>
      </a>
    </Button>
  ),
}

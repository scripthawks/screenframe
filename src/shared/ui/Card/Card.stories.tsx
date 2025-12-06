import { Button, Card, Typography } from '@/shared'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,

  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof Card>

export const CardEmpty: Story = {}

export const CardWithAuth: Story = {
  render: () => (
    <Card
      title={
        <Typography as={'label'} variant={'boldText14'}>
          Sign In
        </Typography>
      }
      footer={
        <>
          <Button variant={'primary'}>Primary Button</Button>
          <Button variant={'secondary'}>Secondary Button</Button>
        </>
      }
    >
      <input placeholder={'Email'} />
      <input placeholder={'Password'} />
    </Card>
  ),
}

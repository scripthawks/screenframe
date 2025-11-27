
import { Meta, StoryObj } from '@storybook/react'
import { Typography,  } from '@/shared/ui'
import {Button} from "@/stories/Button";
import {Card} from "@/shared/ui/Card/Card";

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
                <Typography as="label" variant="boldText14">
                    Sign In
                </Typography>
            }
            footer={
                <>
                    <Button primary={true} size="medium" label="Primary Button" />
                    <Button primary={false} size="medium" label="Secondary Button" />
                </>
            }
        >
            <input placeholder="Email" />
            <input placeholder="Password" />
        </Card>
    ),
}

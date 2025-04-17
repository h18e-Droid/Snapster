import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button'
  },
}
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button'
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button'
  },
}
export const Text: Story = {
  args: {
    variant: 'textButton',
    children: 'Button'
  },
}
export const Variant: Story = {
  args: {
    variant: 'variantButton',
    children: 'Button'
  },
}
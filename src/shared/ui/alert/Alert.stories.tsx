import type { Meta, StoryObj } from "@storybook/react"
import { Alert } from "./Alert"

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  }
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    message: 'SettingSaved',
  },
}

export const Secondary: Story = {
  args: {
    message: 'ServerError',
  },
}

export const ErrorPhotoSize: Story = {
  args: {
    message: 'ErrorPhotoSize',
  },
}
export const ErrorPhotoFormat: Story = {
  args: {
    message: 'ErrorPhotoFormat',
  },
}
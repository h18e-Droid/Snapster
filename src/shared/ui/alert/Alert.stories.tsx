import type { Meta, StoryObj } from "@storybook/react"
import { Alert } from "./Alert"

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    message: "SettingSaved",
    status: "success",
  },
}

export const Secondary: Story = {
  args: {
    message: "ServerError",
    status: "success",
  },
}

export const ErrorPhotoSize: Story = {
  args: {
    message: "ErrorPhotoSize",
    status: "success",
  },
}
export const ErrorPhotoFormat: Story = {
  args: {
    message: "ErrorPhotoFormat",
    status: "success",
  },
}

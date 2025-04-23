import type { Meta, StoryObj } from "@storybook/react"
import { Recaptcha } from "./Recaptcha"
import { within, userEvent, waitFor } from "@storybook/testing-library"
import { expect } from "@storybook/jest"

const meta: Meta<typeof Recaptcha> = {
  title: "Components/Recaptcha",
  component: Recaptcha,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Recaptcha>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByLabelText("I'm not a robot")

    await expect(checkbox).not.toBeChecked()
    await expect(canvas.queryByTestId("preloader")).toBeNull()
  },
}

export const Verifying: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByLabelText("I'm not a robot")

    await userEvent.click(checkbox)

    const preloader = canvas.getByTestId("preloader")
    await expect(preloader).toBeInTheDocument()
    await expect(checkbox).toBeChecked()
  },
}

export const Success: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByLabelText("I'm not a robot")

    await userEvent.click(checkbox)
    await waitFor(
      () => {
        expect(canvas.getByTestId("success-icon")).toBeInTheDocument()
      },
      { timeout: 3500 },
    )
  },
}

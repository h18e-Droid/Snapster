import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import CustomInput from "./CustomInput"

const meta = {
  title: "Example/CustomInput",
  component: CustomInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  args: {
    onChange: fn(),
    errorText: "Error text",
    disabled: false,
    value: "",
  },
} satisfies Meta<typeof CustomInput>

export default meta
type Story = StoryObj<typeof meta>

export const Email: Story = {
  args: {
    placeholder: "enter email",
    type: "email",
    width: "250px",
    label: "Email",
  },
}

export const Password: Story = {
  args: {
    placeholder: "enter password",
    type: "password",
    width: "250px",
    label: "Password",
  },
}

export const Search: Story = {
  args: {
    placeholder: "search",
    type: "search",
    width: "250px",
  },
}

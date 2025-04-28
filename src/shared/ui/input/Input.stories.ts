import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import Input from "./Input"

const meta = {
  title: "Example/Input",
  component: Input,
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
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Email: Story = {
  args: {
    placeholder: "enter email",
    type: "email",
    label: "Email",
  },
}

export const Password: Story = {
  args: {
    placeholder: "enter password",
    type: "password",
    label: "Password",
  },
}

export const Search: Story = {
  args: {
    placeholder: "search",
    type: "search",
  },
}

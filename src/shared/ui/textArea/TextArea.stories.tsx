import type { Meta, StoryObj } from "@storybook/react"
import { TextArea } from "./TextArea"

const meta = {
  title: "Components/Text-Area",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    defaultValue: 'Text-Area'
  }
}
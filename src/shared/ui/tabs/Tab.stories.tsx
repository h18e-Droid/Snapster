import type { Meta, StoryObj } from "@storybook/react"
import Tab from "@/shared/ui/tabs/Tab"


const meta = {
  title: "Components/Tab",
  component: Tab,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: "default",
    tabs: [{ id: "1", label: "Tab 1", content: "" },
      { id: "2", label: "Tab 2", content: "" }]
  }
}

export const Secondary: Story = {
  args: {
    variant: "contrast",
    tabs: [{ id: "2", label: "Tab 1", content: "" },
      { id: "2", label: "Tab 2", content: "" }]
  }
}
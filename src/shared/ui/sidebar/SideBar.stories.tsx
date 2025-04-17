import type { Meta, StoryObj } from "@storybook/react"
import SideBar from "./SideBar"

const meta = {
  title: "Components/SideBar",
  component: SideBar,
  tags: ["autodocs"],
  parameters: {
    layout: "left",
  }
} satisfies Meta<typeof SideBar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
  },
  parameters: {
    viewport: {
      viewport: 'mobile360',
    },
  },
}


import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Select } from "@/shared/ui/select/Select"
import { FlagRussiaIcon, FlagUnitedKingdomIcon } from "@/shared/assets/icons"


const meta = {
  title: "Example/CustomSelect",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    disabled: false,
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectBox: Story = {
  args: {
    options: [
      {id: "1", title: "Select-box 1", },
      {id: "2", title: "Select-box 2", },
      {id: "3", title: "Select-box 3", },
    ],
    width: "250px",
    label: "Select-box",
  },
}

export const SelectBoxLanguage: Story = {
  args: {
    options: [
      {id: "1", title: "Russian", iconSVG: <FlagRussiaIcon/> },
      {id: "2", title: "England", iconSVG: <FlagUnitedKingdomIcon/>},
    ],
    width: "200px",
  },
}





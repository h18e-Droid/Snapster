import type { Meta, StoryObj } from "@storybook/react"
import { Header } from "./Header"

const meta: Meta<typeof Header> = {
  title: "components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "5px 10px", background: "var(--color-dark-700)" }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Header>

export const AuthorizedDesktop: Story = {
  args: {
    isAuth: true,
  },
}

export const NotAuthorizedDesktop: Story = {
  args: {
    isAuth: false,
  },
}

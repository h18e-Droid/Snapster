import type { Meta, StoryObj } from "@storybook/react"
import { Pagination } from "./Pagination"
import { useEffect, useState } from "react"

const meta: Meta<typeof Pagination> = {
  title: "components/Pagination",
  component: Pagination,
  argTypes: {
    totalSize: {
      control: { type: "number" },
    },
    onChange: { action: "pageChanged" },
    currentPage: { control: { type: "number" } },
  },
  parameters: {
    layout: "centered",
  },
}
export default meta

type Story = StoryObj<typeof Pagination>

export const PaginationDefault: Story = {
  args: {
    totalSize: 1100,
    currentPage: 1,
    onChange: (page: number, portion: number) => {
      console.log("Modal:", page, "Portion:", portion)
    },
  },
  argTypes: {
    totalSize: { control: { type: "number" } },
    currentPage: { control: { type: "number" } },
    onChange: { action: "onChange" },
  },
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "lightgray", value: "#f0f0f0" },
        { name: "dark", value: "#333333" },
      ],
    },
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage)

    useEffect(() => {
      setCurrentPage(args.currentPage)
    }, [args.currentPage])

    const handleChange = (page: number, portion: number) => {
      setCurrentPage(page)
      args.onChange(page, portion)
    }

    return (
      <div style={{ padding: 24 }}>
        <Pagination currentPage={currentPage} totalSize={args.totalSize} onChange={handleChange} />
      </div>
    )
  },
}

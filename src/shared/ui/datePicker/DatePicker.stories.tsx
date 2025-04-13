import type { Meta, StoryObj } from "@storybook/react"
import { DatePicker } from "./DatePicker"
import { userEvent, within } from "@storybook/test"

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "radio",
      options: ["single", "range"],
      description: "Режим выбора: одна дата или диапазон",
    },
    isDisabled: {
      control: "boolean",
      description: "Блокировка взаимодействия",
    },
    label: {
      control: "text",
      description: "Текстовая метка для поля ввода",
    },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const SingleDateSelection: Story = {
  args: {
    label: "Выберите дату",
    mode: "single",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByPlaceholderText("Выберите дату"))

    const dayButton = canvas.getByText("15", { selector: "span" })
    await userEvent.click(dayButton)
  },
}

export const DateRangeSelection: Story = {
  args: {
    label: "Выберите период",
    mode: "range",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByPlaceholderText("Выберите диапазон"))
  },
}

export const DisabledState: Story = {
  args: {
    label: "Недоступен",
    isDisabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByPlaceholderText("Выберите дату"))
  },
}

export const MonthNavigation: Story = {
  args: {
    label: "Навигация по месяцам",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByPlaceholderText("Выберите дату"))
    await userEvent.click(canvas.getByLabelText("Следующий месяц"))
    await userEvent.click(canvas.getByLabelText("Предыдущий месяц"))
  },
}

export const ErrorState: Story = {
  args: {
    label: "Ошибка",
    mode: "single",
  },
  parameters: {
    error: true,
    errorMessage: "Произошла ошибка при выборе даты",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByPlaceholderText("Выберите дату"))
  },
}

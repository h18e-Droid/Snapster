import { Select } from "radix-ui"
import { ReactNode } from "react"

type SelectOptionProps = {
  value: string
  children: ReactNode
  className: string
}

export const CustomSelectItem = ({ value, children, className }: SelectOptionProps) => (
  <Select.Item
    value={value}
    className={className}
    onPointerMove={(e) => e.preventDefault()}
    onPointerLeave={(e) => e.preventDefault()}
  >
    <Select.ItemText>{children}</Select.ItemText>
  </Select.Item>
)

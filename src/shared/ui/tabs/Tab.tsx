import * as React from "react"
import { Tabs } from "radix-ui"
import styles from "./Tabs.module.scss"

export type Tab = {
  id: string
  label: string
  content: React.ReactNode | string
}

export type TabProps = {
  contentClassName?: string
  disabled?: boolean
  tabs: Tab[]
  variant: "default" | "contrast"
  onValueChange?: (value: string) => void
  value?: string
}

const color: Record<string, string> = {
  default: styles.default,
  contrast: styles.contrast,
}

const Tab = ({ contentClassName, disabled, tabs, variant, onValueChange, value }: TabProps) => {
  const variantName = variant ? color[variant] : styles.default

  return (
    <Tabs.Root className={styles.tabRoot} onValueChange={onValueChange} value={value}>
      <Tabs.List className={styles.tabList}>
        {tabs.map((tab: Tab) => {
          return (
            <Tabs.Trigger
              className={`${variantName} ${value === tab.id ? styles.active : ""}`}
              value={tab.id}
              key={tab.id}
              disabled={disabled}
            >
              {tab.label}
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
      {tabs.map((tab: Tab) => {
        return (
          <div key={tab.id}>
            <Tabs.Content value={tab.id} key={tab.id} className={contentClassName}>
              {tab.content}
            </Tabs.Content>
          </div>
        )
      })}
    </Tabs.Root>
  )
}

export default Tab

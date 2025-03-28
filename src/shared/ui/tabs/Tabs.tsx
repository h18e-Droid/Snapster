import * as React from "react"
import { Tabs } from "radix-ui"
import styles from "./Tabs.module.css"


export type Tab = {
  id: string;
  label: string;
  content: React.ReactNode | string;
}

export type TabProps = {
  triggerClassName?: string,
  contentClassName?: string
  disabled?: boolean
  tabs: Tab[]
}

export const Tab = ({
                      triggerClassName,
                      contentClassName,
                      disabled,
                      tabs
                    }: TabProps) => {

  return (
    <Tabs.Root className={styles.tabRoot}>
      <Tabs.List className={styles.tabList}>
        {tabs.map((tab: Tab) => {
          return (
            <Tabs.Trigger className={triggerClassName} value={tab.id} key={tab.id} disabled={disabled}>
              {tab.label}
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
        {tabs.map((tab:Tab) => {
          return (
            <div>
              <Tabs.Content value={tab.id} key={tab.id} className={contentClassName}>
                {tab.content}
              </Tabs.Content>
            </div>
            )
        })}
    </Tabs.Root>
  )
}


import * as React from "react"
import { Tabs } from "radix-ui"
import s from "./Tabs.module.css"


export type Tab = {
  id: string;
  label: string;
  content: React.ReactNode | string;
}

export type TabPropsType = {
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
                    }: TabPropsType) => {

  return (
    <Tabs.Root className={s.tabRoot}>
      <Tabs.List className={s.tabList}>
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


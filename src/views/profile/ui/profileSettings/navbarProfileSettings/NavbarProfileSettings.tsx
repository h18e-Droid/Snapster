"use client"

import styles from "./NavbarProfileSettings.module.scss"
import Tab from "@/shared/ui/tabs/Tab"
import * as React from "react"
import GeneralInformation from "@/views/profile/ui/profileSettings/navbarProfileSettings/generalInformation/GeneralInformation"
import { useMemo, useState } from "react"
import Devices from "@/views/profile/ui/profileSettings/navbarProfileSettings/devices/Devices"
import AccountManagement from "@/views/profile/ui/profileSettings/navbarProfileSettings/accountManagement/AccountManagement"
import MyPayments from "@/views/profile/ui/profileSettings/navbarProfileSettings/myPayments/MyPayments"

const NavbarProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("1")
  const tabs = useMemo(
    () => [
      {
        id: "1",
        label: "General information",
        content: <GeneralInformation />,
      },
      {
        id: "2",
        label: "Devices",
        content: <Devices />,
      },
      {
        id: "3",
        label: "Account Management",
        content: <AccountManagement />,
      },
      {
        id: "4",
        label: "My payments",
        content: <MyPayments />,
      },
    ],
    [],
  )

  return (
    <div className={styles.container}>
      <Tab variant={"contrast"} tabs={tabs} value={activeTab} onValueChange={setActiveTab} />
    </div>
  )
}

export default NavbarProfileSettings

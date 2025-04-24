"use client"
import React from "react"
import { FlagRussiaIcon, FlagUnitedKingdomIcon } from "@/shared/assets/icons"
import { Select } from "shared/ui/select"

const languages = [
  { id: "1", title: "Russian", iconSVG: <FlagRussiaIcon /> },
  { id: "2", title: "English", iconSVG: <FlagUnitedKingdomIcon /> },
]

export const LanguageSwitcher = () => {
  const onChangeHandler = (languageId: string) => {
    console.log(languageId)
  }

  return (
    <>
      <Select options={languages} onChange={onChangeHandler} width={"163px"} />
    </>
  )
}

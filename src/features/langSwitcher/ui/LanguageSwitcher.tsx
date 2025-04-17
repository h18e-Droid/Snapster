"use client"
import React from "react"
import { FlagRussiaIcon, FlagUnitedKingdomIcon } from "@/shared/assets/icons"
import { CustomSelect } from "@/shared/ui/customSelect"

const languages = [
  { id: "1", title: "Russian", iconSVG: <FlagRussiaIcon /> },
  { id: "2", title: "England", iconSVG: <FlagUnitedKingdomIcon /> },
]

export const LanguageSwitcher = () => {
  const onChangeHandler = (languageId: string) => {
    console.log(languageId)
  }

  return (
    <>
      <CustomSelect options={languages} onChange={onChangeHandler} width={"163px"} />
    </>
  )
}

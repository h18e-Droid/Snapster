"use client"
import React, { JSX, useState } from "react"
import { Select } from "radix-ui"
import { ArrowDownIcon } from "@/shared/assets/icons/components/ArrowDownIcon"
import { CustomSelectItem } from "@/shared/ui/pagination/components/selector/CustomSelectItem"
import { FlagRussiaIcon, FlagUnitedKingdomIcon } from "@/shared/assets/icons"
import { useMobile } from "@/shared/lib/media"
import { IconProps } from "@/shared/assets/icons/IconWrapper"
import styles from "./LangSwitcher.module.scss"
import clsx from "clsx"
import { CustomSelect } from "@/shared/ui/customSelect"

//🚩🚩🚩❗❗❗❗
//Бета версия!!! по нормальному буду переделивать,

type Country = {
  flag: (allProps: IconProps) => JSX.Element
  language: string
}

const countriesCustom = [
  { id: "1", title: "English" },
  { id: "2", title: "Russian" },
]

const countries: Country[] = [
  { flag: FlagUnitedKingdomIcon, language: "English" },
  { flag: FlagRussiaIcon, language: "Russian" },
]
const LangSwitcher = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const isMobile = useMobile(768)
  const isCustom = false

  return !isCustom ? (
    <Select.Root
      defaultValue={"English"}
      onValueChange={(name) => {
        const country = countries.find((c) => c.language === name)
        if (country) setSelectedCountry(country)
      }}
    >
      <Select.Trigger className={clsx(styles.trigger, { [styles.triggerMobile]: isMobile })}>
        <Select.Value>
          {!isMobile ? (
            <span>
              <selectedCountry.flag /> {selectedCountry.language}
            </span>
          ) : (
            <selectedCountry.flag />
          )}
        </Select.Value>
        <Select.Icon className={styles.triggerIcon}>
          <ArrowDownIcon size={15} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          align={"end"}
          side={"bottom"}
          position={"popper"}
          style={isMobile ? { width: "100px" } : {}}
          className={styles.content}
        >
          <Select.Viewport className={styles.viewport}>
            {countries.map((country, i) => {
              return (
                <CustomSelectItem
                  key={i}
                  value={country.language}
                  className={clsx(styles.item, { [styles.itemMobile]: isMobile })}
                >
                  <country.flag size={20} className={styles.flagIcon} />
                  {country.language}
                </CustomSelectItem>
              )
            })}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  ) : (
    <CustomSelect options={countriesCustom} onChange={() => {}} width={"100"}></CustomSelect>
  )
}

export default LangSwitcher

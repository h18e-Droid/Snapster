"use client"
import { JSX, useState } from "react"
import { Select } from "radix-ui"
import { ArrowDownIcon } from "@/shared/assets/icons/components/ArrowDownIcon"
import { CustomSelectItem } from "@/shared/ui/pagination/components/selector/CustomSelectItem"
import { FlagRussiaIcon, FlagUnitedKingdomIcon } from "@/shared/assets/icons"
import { useMobile } from "@/shared/lib/media"
import { IconProps } from "@/shared/assets/icons/IconWrapper"
import styles from "./LangSwitcher.module.scss"
import clsx from "clsx"

//🚩🚩🚩❗❗❗❗
//Бета версия!!! LangSwitcher оствалю но селектор по нормальному буду переиспользовать,
// просто на момент комита Роман не дописал их.

type Country = {
  flag: (allProps: IconProps) => JSX.Element
  language: string
}

const countries: Country[] = [
  { flag: FlagUnitedKingdomIcon, language: "English" },
  { flag: FlagRussiaIcon, language: "Russian" },
]

const LangSwitcher = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const isMobile = useMobile(1000)

  return (
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
        <Select.Content align={"end"} side={"bottom"} position={"popper"} className={styles.content}>
          <Select.Viewport className={styles.viewport}>
            <CustomSelectItem value="English" className={styles.item}>
              <FlagUnitedKingdomIcon size={20} className={styles.flagIcon} />
              English
            </CustomSelectItem>
            <CustomSelectItem value="Russian" className={styles.item}>
              <FlagRussiaIcon size={20} className={styles.flagIcon} />
              Русский
            </CustomSelectItem>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default LangSwitcher

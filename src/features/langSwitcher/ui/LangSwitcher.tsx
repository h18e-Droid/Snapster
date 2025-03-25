"use client"
import { Select } from "radix-ui"
import { ArrowDownIcon } from "@/shared/assets/icons/components/ArrowDownIcon"
import { CustomSelectItem } from "@/shared/ui/pagination/components/selector/CustomSelectItem"
import { FlagRussiaIcon, FlagUnitedKingdomIcon } from "@/shared/assets/icons/components"
import styles from "./LangSwitcher.module.scss"

const LangSwitcher = () => {
  //🚩🚩🚩❗❗❗❗
  //Бета версия!!! по нормальному буду переиспользовать селекторы, просто на момент комита Роман не дописал их

  return (
    <Select.Root defaultValue={"English"}>
      <Select.Trigger className={styles.trigger}>
        <Select.Value />
        <Select.Icon className={styles.triggerIcon}>
          <ArrowDownIcon size={15} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content side={"bottom"} position={"popper"} className={styles.content}>
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

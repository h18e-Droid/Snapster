import { Select } from "radix-ui"
import styles from "./PageSizeSelcetor.module.scss"
import { ArrowDownIcon } from "@/shared/assets/icons/components/ArrowDownIcon"
import { CustomSelectItem } from "./CustomSelectItem"

type Props = {
  setPortionSize: (value: number) => void
  portionSize: number
}

const PageSizeSelector = ({ setPortionSize, portionSize }: Props) => {
  return (
    <Select.Root
      defaultValue={JSON.stringify(portionSize)}
      onValueChange={(value) => setPortionSize(JSON.parse(value))}
    >
      <Select.Trigger className={styles.trigger}>
        <Select.Value />
        <Select.Icon className={styles.icon}>
          <ArrowDownIcon size={15} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content side={"bottom"} position={"popper"} className={styles.content}>
          <Select.Viewport className={styles.viewport}>
            <CustomSelectItem className={styles.item} value={"10"}>
              10
            </CustomSelectItem>
            <CustomSelectItem className={styles.item} value={"20"}>
              20
            </CustomSelectItem>
            <CustomSelectItem className={styles.item} value={"30"}>
              30
            </CustomSelectItem>
            <CustomSelectItem className={styles.item} value={"50"}>
              50
            </CustomSelectItem>
            <CustomSelectItem className={styles.item} value={"100"}>
              100
            </CustomSelectItem>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default PageSizeSelector

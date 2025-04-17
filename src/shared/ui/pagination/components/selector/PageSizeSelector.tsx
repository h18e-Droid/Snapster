import { Select } from "radix-ui"
import styles from "./PageSizeSelcetor.module.scss"
import { ArrowDownIcon } from "@/shared/assets/icons/components/ArrowDownIcon"
import { CustomSelectItem } from "./CustomSelectItem"

type Props = {
  setPortionSize: (value: number) => void
  portionSize: number
}

type portionSizes = { portionSize: string }

const portionSizes: portionSizes[] = [
  { portionSize: "10" },
  { portionSize: "20" },
  { portionSize: "30" },
  { portionSize: "50" },
  { portionSize: "100" },
]

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
            {portionSizes.map((el: portionSizes, index) => (
              <CustomSelectItem className={styles.item} key={index} value={el.portionSize}>
                {el.portionSize}
              </CustomSelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default PageSizeSelector

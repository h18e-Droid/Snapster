import styles from "./AuthIconButton.module.scss";
import { Button } from "@/shared/ui/button"
import { usePathname } from "next/navigation"

type Props = {
  onClick?: () => void
  icon: React.ReactNode
}

export const AuthIconButton = ({ onClick, icon }: Props) => {
  const pathname = usePathname();

  return (
  <Button
    onClick={onClick}
    className={`${styles.buttonIcon} ${pathname}`}
    style={{padding: 0}}
  >
    {icon}
  </Button>
)}

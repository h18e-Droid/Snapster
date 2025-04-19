import { Button } from "@/shared/ui/button"

type Props = {
  onClick?: () => void
  icon: React.ReactNode
}

export const AuthIconButton = ({ onClick, icon }: Props) => (
  <Button
    onClick={onClick}
    width={0}
    style={{
      background: "none",
      border: "none",
      padding: 0,
      marginRight: "24px",
      cursor: "pointer",
      width: 0
  }}
  >
    {icon}
  </Button>
)

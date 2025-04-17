import "./cards.scss"
import { ReactNode } from "react"

type Props = {
  title: string
  children: ReactNode
}

export const Cards = ({ title, children }: Props) => {
  return (
    <div className="cardContainer">
        <div className="content">
            <h2 className='title'>{title}</h2>
                {children}
            </div>
    </div>
  )
}

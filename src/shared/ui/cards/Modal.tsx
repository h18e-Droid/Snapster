import "./modal.scss"
import { ReactNode } from "react"

type Props = {
    active: boolean
    setActive: (val: boolean) => void
    title?: string
    children?: ReactNode
}

export const Modal = ({ active, setActive,title, children }: Props) => {

    const StyleCards=active?"modal active" : "modal"
    const StyleContent=active ? "modal-content active" : "modal-content"

    return (
        <div className={StyleCards} onClick={() => setActive(false)}>
            <div className={StyleContent} onClick={(event) => event.stopPropagation()}>
                <h2 className='title'>{title}</h2>
                {children}
            </div>
        </div>
    )
}


import "./modal.scss"
import { ReactNode } from "react"

type Props = {
  active: boolean
  setActive: (val: boolean) => void
  title: string
  children: ReactNode
  classNameContent?: string
  typeModal?: string
}

export const ModalFix = ({ active, setActive,title, children,classNameContent, typeModal }: Props) => {

  let StyleCards= active ? "modal active" : "modal"
  if(typeModal === "publicationPages" && active) {
    StyleCards = "modalPublicationPage active"
  }

  const StyleContent = active
    ? `modal-content active ${classNameContent ? classNameContent : ''}`
    : "modal-content";

  return (
    <div className={StyleCards} onClick={() => setActive(false)}>
      <div className={StyleContent} onClick={(event) => event.stopPropagation()}>
        <h2 className='title'>{title}</h2>
        {children}
      </div>
    </div>
  )
}

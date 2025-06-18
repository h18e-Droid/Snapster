// import styles from "./Cards.module.scss"
// import { ReactNode } from "react"
// import clsx from "clsx"
//
// type Props = {
//   title: string
//   children: ReactNode
//   className?: string
//   classNameContainer?: string
//   classNameContent?: string
// }
//
// export const Cards = ({ title, children, className,classNameContainer,classNameContent }: Props) => {
//   return (
//     // <div className={clsx(className, styles.cardContainer)}>
//     //   <div className={styles.content}>
//     // <div className={clsx(className, styles.cardContainer)}>
//     <div className={classNameContainer || clsx(className, styles.cardContainer)}>
//
//       {/*<div className={styles.content}>*/}
//       <div className={classNameContent || styles.content}>
//
//         <h2 className={styles.title}>{title}</h2>
//         {children}
//       </div>
//     </div>
//   )
// }


import "./cards.scss"
import { ReactNode } from "react"

type Props = {
  title: string
  children?: ReactNode
  classNameContent?: string
  classNameContainer?: string
}

export const CardsFix = ({ title, children,classNameContent,classNameContainer }: Props) => {
  return (
    // <div className="cardContainer">
    <div className= {classNameContainer?'cardContainer-special' : 'cardContainer'}>
      <div className={classNameContent ? 'content-special' : 'content'}>
        <h2 className='title'>{title}</h2>
        {children}
      </div>
    </div>
  )
}
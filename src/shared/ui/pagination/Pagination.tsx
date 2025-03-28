import React, { useState } from "react"
import PageNavigator from "./components/pageNavigator/PageNavigator"
import PageSizeSelector from "./components/selector/PageSizeSelector"
import styles from "./Pagination.module.scss"
import clsx from "clsx"

type Props = {
  totalSize: number
  onChange: (currentPage: number, portionSize: number) => void
  className?: string
}

export const Pagination = ({ totalSize, onChange, className }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [portionSize, setPortionSize] = useState<number>(10)

  const setPortionSizeHandler = (value: number) => {
    setPortionSize(value)
    onChange(currentPage, portionSize)
  }

  const setCurrentPageHandler = (page: number) => {
    setCurrentPage(page)
    onChange(currentPage, portionSize)
  }

  const totalPages = Math.ceil(totalSize / portionSize)

  return (
    <div className={clsx(styles.paginationContainer, className)}>
      <PageNavigator currentPage={currentPage} setCurrentPage={setCurrentPageHandler} totalPages={totalPages} />
      <span className={styles.text}>Show</span>
      <PageSizeSelector setPortionSize={setPortionSizeHandler} portionSize={portionSize} />
      <span className={styles.text}>on page</span>
    </div>
  )
}

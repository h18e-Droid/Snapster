import React, { useState } from "react"
import PageNavigator from "./components/pageNavigator/PageNavigator"
import PageSizeSelector from "./components/selector/PageSizeSelector"
import styles from "./Pagination.module.scss"

type Props = {
  totalSize: number
}

const Pagination = ({ totalSize }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [portionSize, setPortionSize] = useState<number>(10)

  const setPortionSizeHandler = (value: number) => {
    setPortionSize(value)
  }

  const setCurrentPageHandler = (page: number) => {
    setCurrentPage(page)
  }

  const totalPages = Math.ceil(totalSize / portionSize)

  return (
    <div className={styles.paginationContainer}>
      <PageNavigator currentPage={currentPage} setCurrentPage={setCurrentPageHandler} totalPages={totalPages} />
      <span className={styles.text}>Show</span>
      <PageSizeSelector setPortionSize={setPortionSizeHandler} portionSize={portionSize} />
      <span className={styles.text}>on page</span>
    </div>
  )
}

export default Pagination

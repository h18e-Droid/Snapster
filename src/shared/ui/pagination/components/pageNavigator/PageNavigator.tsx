import React from "react"
import { getPaginationRange } from "./getPaginationRange"
import styles from "./PageNavigator.module.scss"
import { ArrowDownIcon } from "@/shared/assets/icons/components/ArrowDownIcon"

type Props = {
  totalPages: number
  currentPage: number
  setCurrentPage: (currentPage: number) => void
}

const PageNavigator = ({ totalPages, currentPage, setCurrentPage }: Props) => {
  const pages = getPaginationRange(currentPage, totalPages, 1)
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className={styles.pageNavigatorContainer}>
      <button className={styles.buttons} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ArrowDownIcon size={18} className={styles.backIcon} />
      </button>
      <div className={styles.pagesWrapper}>
        {pages.map((page, index) => {
          if (page === "dots") {
            return (
              <span key={`dots-${index}`} className={styles.dots}>
                ...
              </span>
            )
          }

          return (
            <button
              key={`page-${index}`}
              aria-current={page === currentPage ? "page" : undefined}
              tabIndex={page === currentPage ? -1 : 0}
              className={`${styles.page} ${page === currentPage ? styles.active : ""}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        })}
      </div>
      <button
        className={styles.buttons}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowDownIcon size={18} className={styles.forwardIcon} />
      </button>
    </div>
  )
}

export default PageNavigator

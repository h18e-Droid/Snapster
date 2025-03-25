type PaginationRange = (number | "dots")[]

export function getPaginationRange(current: number, total: number, siblingCount: number = 1): PaginationRange {
  const DOTS = "dots"
  const totalPageNumbers = siblingCount * 2 + 5

  if (total <= totalPageNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(current - siblingCount, 1)
  const rightSibling = Math.min(current + siblingCount, total)

  const showLeftDots = leftSibling > 2
  const showRightDots = rightSibling < total - 1

  const firstPage = 1
  const lastPage = total

  const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i)

  if (!showLeftDots && showRightDots) {
    const leftRange = range(1, 3 + siblingCount * 2)
    return [...leftRange, DOTS, total]
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = range(total - (2 + siblingCount * 2), total)
    return [firstPage, DOTS, ...rightRange]
  }

  if (showLeftDots && showRightDots) {
    const middleRange = range(leftSibling, rightSibling)
    return [firstPage, DOTS, ...middleRange, DOTS, lastPage]
  }
  return []
}

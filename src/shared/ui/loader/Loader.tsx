"use client"
import React, { useEffect, useState } from "react"
import styles from "./Loader.module.scss"

export const Loader = () => {
  const text = "snapster"
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % text.length)
    }, 900)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.multiLetterLoader}>
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`${styles.letter} ${styles[`letter${index}`]} ${index === currentIndex ? styles.visible : ""}`}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}

"use client"
import React from "react"
import styles from "./Header.module.scss"
import { HeaderButtons } from "./headersButtons/HeaderButtons"
import { LanguageSwitcher } from "@/features/langSwitcher"
import Link from "next/link"
import { appRoutes } from "@/shared/lib/routes"
import { Alert } from "@/shared/ui/alert"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"
import { nanoid } from "@reduxjs/toolkit"
import NextTopLoader from "nextjs-toploader"

export const Header = () => {
  const app = useAppSelector((state) => state.app)

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Link href={appRoutes.home}>Snapster</Link>
        </h2>
        <nav className={styles.navigationWrapper}>
          <LanguageSwitcher />
          <HeaderButtons />
        </nav>
      </div>
      {(app.status === "success" || app.status === "error") && (
        <Alert key={nanoid()} message={app[app.status]} status={app.status} />
      )}
      <NextTopLoader
        color="#397df6"
        zIndex={100000}
        initialPosition={0.08}
        crawlSpeed={200}
        height={2}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
      />
    </header>
  )
}

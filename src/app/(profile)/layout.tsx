"use client"
import React from "react"
import PrivateLayout from "@/app/(private)/layout"
import PublicLayout from "@/app/(public)/layout"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const isAuth = useAppSelector((s) => s.auth.isAuth)

  return isAuth ? <PrivateLayout>{children}</PrivateLayout> : <PublicLayout>{children}</PublicLayout>
}

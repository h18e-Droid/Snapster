"use client"
import React from "react"
import Link from "next/link"
import { appRoutes } from "@/shared/lib/routes"

export default function Home() {
  return (
    <div>
      Home Page
      <div>_______</div>
      <Link href={appRoutes.private.profile}>profile</Link>
    </div>
  )
}

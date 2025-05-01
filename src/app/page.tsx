"use client"
import React from "react"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      Home Page
      <div>_______</div>
      <Link href={""} style={{ color: "white" }}>
        SignIn
      </Link>
    </div>
  )
}

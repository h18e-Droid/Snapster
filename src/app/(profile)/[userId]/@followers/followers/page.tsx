"use client"
import React from "react"
import { useParams, useRouter } from "next/navigation"
import { Modal } from "@/shared/ui/modal"

const Page = () => {
  const params = useParams()
  const router = useRouter()
  const closeModal = () => router.replace(`/${params.userId}`, { scroll: false })

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <Modal active={true} setActive={closeModal} title={"Followers"}></Modal>
    </div>
  )
}

export default Page

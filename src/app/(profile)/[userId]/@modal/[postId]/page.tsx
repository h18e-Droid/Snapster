"use client"
import React from "react"
import { useParams, useRouter } from "next/navigation"

const Page = () => {
  const params = useParams()
  console.log(params)
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
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          minWidth: "300px",
        }}
      >
        <button onClick={closeModal}>Закрити</button>
      </div>
    </div>
  )
}

export default Page

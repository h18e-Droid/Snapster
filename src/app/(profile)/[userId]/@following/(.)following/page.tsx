"use client"
import Following from "@/views/profile/ui/following/Following"
import HeaderInfoUserModal from "@/views/profile/ui/headerInfoUserModal/HeaderInfoUserModal"
import React from "react"

const Page = () => {
  return (
    <HeaderInfoUserModal title={"Following"} count={12342}>
      <Following />
    </HeaderInfoUserModal>
  )
}

export default Page

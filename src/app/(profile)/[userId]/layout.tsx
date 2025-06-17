import React, { ReactNode } from "react"

export default function Layout({
  children,
  post,
  following,
  followers,
}: {
  children: ReactNode
  post: React.ReactNode
  following: React.ReactNode
  followers: React.ReactNode
}) {
  return (
    <>
      {children}
      {post}
      {following}
      {followers}
    </>
  )
}

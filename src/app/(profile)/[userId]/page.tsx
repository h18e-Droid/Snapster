import React from "react"
import Profile from "@/views/profile"
import { isUserAuthenticated } from "@/shared/lib/state/isUserAuthenticated"

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const isAuth = isUserAuthenticated()

  return <Profile userId={React.use(params).userId} isAuth={isAuth} />
}

export default Page

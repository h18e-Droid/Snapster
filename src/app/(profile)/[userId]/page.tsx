import Profile from "@/views/profile"
import { cookies } from "next/headers"
import React from "react"
import { Button } from "@/shared/ui/button"

const Page = ({ params }: { params: { userId: string } }) => {
  const cookiesResponse = cookies()
  const isAuth = React.use(cookiesResponse).has("refreshTokenCustom")

  return isAuth ? (
    <Profile userId={params.userId}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button style={{ height: "36px", width: "167px" }}>Profile Settings</Button>
      </div>
    </Profile>
  ) : (
    <Profile userId={params.userId} />
  )
}

export default Page

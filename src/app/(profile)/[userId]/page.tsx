import Profile from "@/views/profile"
import { cookies } from "next/headers"
import React from "react"
import { Button } from "@/shared/ui/button"

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const cookiesResponse = cookies()
  const isAuth = React.use(cookiesResponse).has("refreshTokenCustom")

  return isAuth ? (
    <Profile userId={React.use(params).userId}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button style={{ height: "36px", width: "167px" }}>Profile Settings</Button>
      </div>
    </Profile>
  ) : (
    <Profile userId={React.use(params).userId} />
  )
}

//юзер айді в сешн сторі або локал він ітак клієнстський плюс скрол можна туда же, дальше кнопки ітак треба отдельнц компоненту робити бо ssr не пускає onClick,
// потім перевірка на userId яке достаєм там же з стора або локал або сешн і перевіряєм чи юзер це я потім

export default Page

import { SignIn } from "@/views/signIn"
import { Suspense } from "react"

const Page = () => {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  )
}

export default Page

import { Suspense } from "react"
import SignUpPageContent from "@/views/signUp/signUpPageContent/SignUpPageContent"

const Page = () => {
  return (
    <Suspense>
      <SignUpPageContent />
    </Suspense>
  )
}

export default Page

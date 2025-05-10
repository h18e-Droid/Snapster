import { Suspense } from "react"
import SignUpPageContent from "@/app/signUp/signUpPageContent/SignUpPageContent"

const Page = () => {
  return (
    <Suspense>
      <SignUpPageContent />
    </Suspense>
  )
}

export default Page

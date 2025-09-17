import { api } from "@/shared/api/baseServerApi"
import { VerificationSuccess } from "@/views/verificationSuccess"
import { VerificationFailed } from "@/views/verificationFailed"
import { SignUp } from "@/views/auth/signUp"

const Page = async ({ searchParams }: { searchParams: Promise<{ code?: string }> }) => {
  const code = (await searchParams).code
  if (code) {
    try {
      const res = await api.post("api/v1/auth/registration-confirmation", { code })
      if ((res as { status: number }).status !== 400) {
        return <VerificationSuccess />
      }
    } catch (err) {
      console.warn(err)
      return <VerificationFailed />
    }
  }

  return <SignUp />
}

export default Page

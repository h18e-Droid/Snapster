import CreateNewPassword from "@/views/createNewPassword/CreateNewPassword"
import { redirect } from "next/navigation"
import { appRoutes } from "@/shared/lib/routes"

const Page = async ({ searchParams }: { searchParams: Promise<{ code?: string }> }) => {
  const code = (await searchParams).code
  if (code) {
    return <CreateNewPassword recoveryCode={code} />
  } else {
    redirect(appRoutes.public.forgotPassword)
  }
}

export default Page

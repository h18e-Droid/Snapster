"use client"

import SignUp from "@/views/signUp/SignUp"
import { useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { confirmRegistration } from "@/features/auth/model/slice"
import { AppDispatch, RootState } from "@/app/store"
import Congratulations from "@/views/signUp/congatulations/Congratulations"
import VerificationLink from "@/views/signUp/verificationLink/VerificationLink"
import { useEffect } from "react"
import { Loader } from "@/shared/ui/loader"

const SignUpPageContent = () => {
  const searchParams = useSearchParams()
  const status = useSelector<RootState, string>((state) => state.auth.status)
  const loader = useSelector<RootState, boolean>((state) => state.auth.loader)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (searchParams.get("code")) {
      dispatch(confirmRegistration({ code: searchParams.get("code") as string }))
    }
  }, [])

  if(!loader && searchParams.get("code")) {
    return <Loader />
  }
  if(searchParams.get("code") && status === "success") {
    return <Congratulations />
  } else if (searchParams.get("code") && status === "failed") {
    return <VerificationLink />
  }

  return <SignUp />

}

export default SignUpPageContent

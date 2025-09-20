"use client"

import { Loader } from "@/shared/ui/loader"
import { Suspense } from "react"
import PrivacyPolicyContent from "@/views/privacyPolicy/privacyPolicyContent/PrivacyPolicyContent"

const PrivacyPolicy = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <PrivacyPolicyContent />
    </Suspense>
  )
}

export default PrivacyPolicy

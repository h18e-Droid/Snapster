"use client"

import styles from "./GeneralInformation.module.scss"
import React, { useMemo } from "react"
import { Loader } from "@/shared/ui/loader"
import { Alert } from "@/shared/ui/alert/Alert"
import UserDetailsForm from "./userDetailsForm/UserDetailsForm"
import UserPhotoSection from "./userPhotoSection/UserPhotoSection"
import { Button } from "@/shared/ui/button"
import { useGetGeneralInfoQuery, useUpdateGeneralInfoMutation } from "@/features/generalInfo/api/generalInfoApi"

const GeneralInformation = () => {

  const { data, isLoading, error } = useGetGeneralInfoQuery()
  const [ updateGeneralInfo, { isSuccess: isUpdated, error: updateError }] =
    useUpdateGeneralInfoMutation()

  const alert = useMemo(() => {
    if (error || updateError) {
      return { text: "Error! Server is not available!", status: "error" as const }
    }
    if (isUpdated) {
      return { text: "Your settings are saved!", status: "success" as const }
    }
    return null
  }, [error, updateError, isUpdated])

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.photoSection}>
            <UserPhotoSection />
          </div>
          <div className={styles.formSection}>
            <UserDetailsForm idForm={"userDetailsForm"} userDate={data} updateGeneralInfo={updateGeneralInfo}/>
          </div>
          <hr className={styles.line}></hr>
          <div className={styles.buttonWrapper}>
            <Button type="submit" variant={"primary"} form={"userDetailsForm"}>
              Save Changes
            </Button>
          </div>
        </>
      )}
      {alert && (
        <Alert
          message={alert.text}
          status={alert.status}
          duration={3000}
        />
      )}
    </div>
  )
}

export default React.memo(GeneralInformation)

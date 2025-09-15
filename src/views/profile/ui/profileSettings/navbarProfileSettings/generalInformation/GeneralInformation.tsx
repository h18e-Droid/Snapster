"use client"

import styles from "./GeneralInformation.module.scss"
import React, { useEffect, useState } from "react"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"
import { Loader } from "@/shared/ui/loader"
import { Alert, AlertProps } from "@/shared/ui/alert/Alert"
import UserDetailsForm from "./userDetailsForm/UserDetailsForm"
import { fetchGeneralInfo } from "@/features/generalInfo/model/generalInfoSlice"
import { useAppDispatch } from "@/shared/lib/state/useAppDispatch"
import UserPhotoSection from "./userPhotoSection/UserPhotoSection"
import { Button } from "@/shared/ui/button"

const GeneralInformation = () => {
  const { isLoading, success, error } = useAppSelector((state) => state.generalInfo)
  const [alertMessage, setAlertMessage] = useState<null | AlertProps["message"]>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (success) {
      setAlertMessage("SettingSaved")
    } else if (error) {
      setAlertMessage("ServerError")
    }
    const time = setTimeout(() => setAlertMessage(null), 3000)
    return () => clearTimeout(time)
  }, [success, error])

  const onClickCloseAlert = () => {
    setAlertMessage(null)
  }

  useEffect(() => {
    dispatch(fetchGeneralInfo())
  }, [])

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
            <UserDetailsForm idForm={"userDetailsForm"} />
          </div>
          <hr className={styles.line}></hr>
          <div className={styles.buttonWrapper}>
            <Button type="submit" variant={"primary"} form={"userDetailsForm"}>
              Save Changes
            </Button>
          </div>
        </>
      )}
      {alertMessage && (
        <Alert message={alertMessage} classNameProps={styles.alertMessage} onClickClose={onClickCloseAlert} />
      )}
    </div>
  )
}

export default React.memo(GeneralInformation)

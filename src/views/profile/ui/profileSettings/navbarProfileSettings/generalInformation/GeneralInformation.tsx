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
  const dispatch = useAppDispatch()

  const alerts: Record<NonNullable<AlertProps["message"]>, { text: string; status: "success" | "error" }> = {
    success: {
      text: "Your settings are saved!",
      status: "success",
    },
    error: {
      text: "Error! Server is not available!",
      status: "error",
    },
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
      {(success || error) && (
        <Alert message={success ? alerts.success.text : alerts.error.text}
               status={success ? alerts.success.status : alerts.error.status}
               duration={3000}
        />
      )}

    </div>
  )
}

export default React.memo(GeneralInformation)

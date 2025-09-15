"use client"

import styles from "./UserDetailsForm.module.scss"
import { Controller, useForm } from "react-hook-form"
import Input from "@/shared/ui/input/Input"
import { DatePicker } from "@/shared/ui/datePicker/DatePicker"
import Link from "next/link"
import { appRoutes } from "@/shared/lib/routes"
import WindowedSelect, { DropdownIndicatorProps, StylesConfig } from "react-windowed-select"
import { TextArea } from "@/shared/ui/textArea"
import React, { useEffect } from "react"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"
import { useAppDispatch } from "@/shared/lib/state/useAppDispatch"
import { generalInfoActions, updateFetchGeneralInfo } from "@/features/generalInfo/model/generalInfoSlice"
import { components } from "react-select"
import { ArrowUpIcon } from "@/shared/assets/icons/components/ArrowUpIcon"
import { ArrowDownIcon } from "@/shared/assets/icons/components/ArrowDownIcon"
import { GeneralInfoFormValues, generalInfoSchema } from "@/shared/lib/schemas/generalInfoSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { City, Country } from "country-state-city"

const selectStyles: StylesConfig<unknown, boolean> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--color-dark-700)",
    borderColor: state.isFocused ? "var(--color-info-500)" : "var(--color-dark-100)",
    borderRadius: 4,
    minHeight: 36,
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--color-dark-500)",
    border: "1px solid #fff",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "var(--color-dark-300)" : "var(--color-dark-500)",
    color: "var(--color-light-100)",
    padding: "10px 12px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--color-light-100)",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--color-light-900)",
  }),
}

type Props = {
  idForm?: string
}

const UserDetailsForm = ({ idForm }: Props) => {
  const userDate = useAppSelector((state) => state.generalInfo.currentGeneralInfo)
  const userId = useAppSelector((state) => state.user.userId)

  const dispatch = useAppDispatch()

  const DropdownIndicator = (props: DropdownIndicatorProps<any, false>) => {
    return (
      <components.DropdownIndicator {...props}>
        {isOpenSelect ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </components.DropdownIndicator>
    )
  }

  let isOpenSelect = false

  const { control, handleSubmit, reset, watch, setValue, setError, clearErrors } = useForm<GeneralInfoFormValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: userDate,
  })

  const onSubmit = (data: GeneralInfoFormValues) => {
    dispatch(updateFetchGeneralInfo(data))
  }

  useEffect(() => {
    if (userDate) {
      reset(userDate)
    }
  }, [userDate, reset])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (!name) return
      dispatch(generalInfoActions.setFormDraftField({ field: name, value: value[name] as string }))
    })
    return () => subscription.unsubscribe()
  }, [watch, dispatch])

  const countries = Country.getAllCountries().map((c) => ({ id: c.isoCode, title: c.name }))
  const countryValue = watch("country")
  const cities = countryValue ? City.getCitiesOfCountry(countryValue)?.map((c) => ({ id: c.name, title: c.name })) : []

  const formatDate = (date: Date | null): string => {
    if (!date) return ""
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }
  return (
    <div className={styles.boxInput}>
      <form id={idForm} onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="userName"
          control={control}
          render={({ field, fieldState }) => (
            <div className={styles.fieldGroup}>
              <Input
                label="Username*"
                type="text"
                value={field.value}
                onChange={field.onChange}
                className={styles.inputAll}
              />
              {fieldState.error && <p className={styles.errorText}>{fieldState.error.message}</p>}
            </div>
          )}
        />
        <Controller
          name="firstName"
          control={control}
          render={({ field, fieldState }) => (
            <div className={styles.fieldGroup}>
              <Input
                label="First Name*"
                type="text"
                value={field.value}
                onChange={field.onChange}
                className={styles.inputAll}
              />
              {fieldState.error && <p className={styles.errorText}>{fieldState.error.message}</p>}
            </div>
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field, fieldState }) => (
            <div className={styles.fieldGroup}>
              <Input
                label="Last Name*"
                type="text"
                value={field.value}
                onChange={field.onChange}
                className={styles.inputAll}
              />
              {fieldState.error && <p className={styles.errorText}>{fieldState.error.message}</p>}
            </div>
          )}
        />
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <div className={styles.fieldGroup}>
                <DatePicker
                  label="Date of birth"
                  value={field.value ? new Date(field.value) : null}
                  error={!!fieldState.error}
                  onChange={(date) => {
                    if (!date) {
                      field.onChange("")
                      return
                    }
                    const today = new Date()
                    if (date > today) {
                      setError("dateOfBirth", {
                        type: "manual",
                        message: "The date cannot be in the future.",
                      })
                      field.onChange("")
                      return
                    }
                    const age = today.getFullYear() - date.getFullYear()
                    const m = today.getMonth() - date.getMonth()
                    const d = today.getDate() - date.getDate()
                    const isUnder13 = age < 13 || (age === 13 && (m < 0 || (m === 0 && d < 0)))
                    if (isUnder13) {
                      setError("dateOfBirth", {
                        type: "manual",
                        message: "A user under 13 cannot create a profile.",
                      })
                      field.onChange("")
                      return
                    }
                    clearErrors("dateOfBirth")
                    field.onChange(formatDate(date))
                  }}
                />
                {fieldState.error && (
                  <p className={styles.errorText}>
                    {fieldState.error.message}{" "}
                    {fieldState.error.message === "A user under 13 cannot create a profile." && (
                      <Link
                        href={`${appRoutes.public.privacyPolicy}?source=generalInfo&userId=${userId}`}
                        className={styles.link}
                      >
                        Privacy Policy
                      </Link>
                    )}
                  </p>
                )}
              </div>
            )
          }}
        />
        <div className={styles.boxSelects}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => {
              return (
                <div>
                  <label htmlFor="country" className={styles.labelSelect}>
                    Country
                  </label>
                  <WindowedSelect
                    instanceId={"country-select"}
                    {...field}
                    onMenuOpen={() => (isOpenSelect = true)}
                    onMenuClose={() => (isOpenSelect = false)}
                    options={countries.map((c) => ({ value: c.id, label: c.title }))}
                    value={
                      field.value
                        ? {
                            value: field.value,
                            label: countries.find((c) => c.id === field.value)?.title,
                          }
                        : null
                    }
                    onChange={(option: unknown) => {
                      if (option && typeof option === "object" && "value" in option && typeof option.value === "string")
                        field.onChange(option.value)
                      setValue("city", "")
                    }}
                    placeholder="Country"
                    isSearchable
                    maxMenuHeight={200}
                    windowThreshold={10}
                    styles={selectStyles}
                    components={{
                      IndicatorSeparator: () => null,
                      DropdownIndicator,
                    }}
                  />
                </div>
              )
            }}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => {
              return (
                <div>
                  <label htmlFor="city" className={styles.labelSelect}>
                    City
                  </label>
                  <WindowedSelect
                    instanceId={"city-select"}
                    options={cities?.map((c) => ({ value: c.id, label: c.title })) ?? []}
                    value={
                      field.value
                        ? { value: field.value, label: cities?.find((c) => c.id === field.value)?.title }
                        : null
                    }
                    onChange={(option: unknown) => {
                      if (option && typeof option === "object" && "value" in option && typeof option.value === "string")
                        field.onChange(option.value)
                    }}
                    onMenuOpen={() => (isOpenSelect = true)}
                    onMenuClose={() => (isOpenSelect = false)}
                    onBlur={field.onBlur}
                    placeholder="City"
                    isSearchable
                    maxMenuHeight={200}
                    windowThreshold={10}
                    styles={selectStyles}
                    components={{
                      IndicatorSeparator: () => null,
                      DropdownIndicator,
                    }}
                    noOptionsMessage={() => "No cities"}
                  />
                </div>
              )
            }}
          />
        </div>
        <Controller
          name="aboutMe"
          control={control}
          render={({ field, fieldState }) => (
            <div className={styles.fieldGroup}>
              <TextArea
                title="About Me"
                placeholder="Text-area"
                value={field.value}
                onChange={field.onChange}
                width={"100%"}
                height={"84px"}
              />
              {fieldState.error && <p style={{ color: "red" }}>{fieldState.error.message}</p>}
            </div>
          )}
        />
      </form>
    </div>
  )
}

export default React.memo(UserDetailsForm)

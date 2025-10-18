import { GeneralInformationType } from "@/features/generalInfo/api/generalInfoApi"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type GeneralInfoState = {
  currentGeneralInfo: GeneralInformationType
  isLoading: boolean
  error: string | null
  success: boolean
}

const initialState: GeneralInfoState = {
  currentGeneralInfo: {
    userName: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    country: "",
    city: "",
    aboutMe: "",
  },
  isLoading: false,
  error: null,
  success: false,
}

const slice = createSlice({
  name: "generalInfo",
  initialState,
  reducers: {
    setFormDraftField: (state, action: PayloadAction<{field: string, value: string}>) => {
      const { field, value } = action.payload
      state.currentGeneralInfo[field as keyof GeneralInformationType] = value
    },
  },
})


export const generalInfoActions = slice.actions
export const generalInfoReducer = slice.reducer

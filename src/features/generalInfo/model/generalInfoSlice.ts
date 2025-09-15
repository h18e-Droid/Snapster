import { generalInfoApi, GeneralInformationType } from "@/features/generalInfo/api/generalInfoApi"
import { createSlice, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "@/shared/lib/state/createAppAsyncThunk"


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

function isGeneralInfoPayload(payload: unknown): payload is GeneralInformationType {
  return (
    payload !== null &&
    typeof payload === "object" &&
    "userName" in payload &&
    "firstName" in payload &&
    "lastName" in payload
  )
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneralInfo.fulfilled, (state, action) => {
        if(isGeneralInfoPayload(action.payload)) {
          state.currentGeneralInfo = action.payload as GeneralInformationType
          state.isLoading = false
        }
      })
      .addCase(updateFetchGeneralInfo.fulfilled, (state, action) => {
        if(isGeneralInfoPayload(action.payload)){
          state.currentGeneralInfo = action.payload as GeneralInformationType
          state.isLoading = false
          state.success = true
        }
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true
          state.error = null
          state.success = false
        }
      )
      .addMatcher(isRejected, (state, action) => {
        state.isLoading = false
        state.success = false
        if (action.payload && typeof action.payload === "string") {
          state.error = action.payload
        } else {
          state.error = action.error.message || "Something went wrong"
        }
      })
  },
})

export const fetchGeneralInfo = createAppAsyncThunk<GeneralInformationType, void>(
  `${slice.name}/fetchGeneralInfo`,
  async (arg, { rejectWithValue }) => {
    try {
      const response = await generalInfoApi.getGeneralInfo()
      return response.data
    } catch (error) {
      return rejectWithValue((error as Error).message ?? "Unknown error")
    }
  },
)

export const updateFetchGeneralInfo = createAppAsyncThunk<GeneralInformationType, GeneralInformationType>(
  `${slice.name}/updateFetchGeneralInfo`,
  async (date, { rejectWithValue }) => {
    try {
      const response = await generalInfoApi.putGeneralInfo(date)
      return response.data
    } catch (error) {
      return rejectWithValue((error as Error).message ?? "Unknown error")
    }
  },
)

export const generalInfoActions = slice.actions
export const generalInfoReducer = slice.reducer

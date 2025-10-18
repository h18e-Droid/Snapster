import { api } from "@/shared/api/baseClientApi"


export type GeneralInformationType = {
  userName: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  country?: string
  city?: string
  aboutMe?: string
}

export const generalInfoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGeneralInfo: build.query<GeneralInformationType, void>({
      query: () => "/api/v1/general-information",
      providesTags: ["me"],
    }),
    updateGeneralInfo: build.mutation<GeneralInformationType, GeneralInformationType>({
      query: (body) => ({
        url: "/api/v1/general-information",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["me"],
    }),
  }),
})

export const {useGetGeneralInfoQuery, useUpdateGeneralInfoMutation} = generalInfoApi
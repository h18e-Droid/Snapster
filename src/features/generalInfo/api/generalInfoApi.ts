import { axiosInstance } from "@/shared/api/baseClientApi"


export type GeneralInformationType = {
  userName: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  country?: string
  city?: string
  aboutMe?: string
}

export const generalInfoApi = {
  getGeneralInfo: async () => {
    return axiosInstance.get<GeneralInformationType>(`/api/v1/general-information`)
  },
  putGeneralInfo: async (date: GeneralInformationType) => {
    return axiosInstance.put<GeneralInformationType>(`/api/v1/general-information`, date)
}

}
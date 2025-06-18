export const appRoutes = {
  private: {
    create: "/newPublication"
  },
  public: {
    profile: "/profile",
    createNewPassword: "/createNewPassword",
    forgotPassword: "/forgotPassword",
    passwordRecovery: "/passwordRecovery",
    privacyPolicy: "/privacyPolicy",
    signIn: "/signIn",
    signUp: "/signUp",
    termsOfService: "/termsOfService",
  },
  home: "/",
} as const

type Routes = typeof appRoutes

export type AppRoutes = PrivateRoutes | PublicRoutes

export type PrivateRoutes = Routes["private"][keyof Routes["private"]]

// Для публічних:
export type PublicRoutes = Routes["public"][keyof Routes["public"]]

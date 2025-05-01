import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { appRoutes } from "@/shared/lib/enums/routes"

const publicRoutes = [appRoutes.signIn, appRoutes.signUp, appRoutes.forgotPassword]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("refreshTokenCustom")?.value
  const isPublicPage = publicRoutes.includes(pathname as appRoutes)
  console.log("TEST>>>", token, isPublicPage)

  if (!token && !isPublicPage) {
    const loginUrl = new URL(appRoutes.signIn, request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (token && isPublicPage) {
    return NextResponse.redirect(new URL(appRoutes.home, request.url), {
      headers: {
        "Cache-Control": "no-store, max-age=0", // Блокує кешування
      },
    })
  }
  return NextResponse.next()
}

export const config = {
  matcher: [Object.values(appRoutes)],
}

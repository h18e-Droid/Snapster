import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { appRoutes, PrivateRoutes } from "@/shared/lib/routes"

const privateRoutes = Object.values(appRoutes.private)

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("refreshTokenCustom")?.value
  const isPrivatePage = privateRoutes.includes(pathname as PrivateRoutes)

  if (!token && isPrivatePage) {
    const loginUrl = new URL(appRoutes.public.signIn, request.url)
    loginUrl.searchParams.set("callbackUrl", pathname) // pathname = /profile наприклад
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

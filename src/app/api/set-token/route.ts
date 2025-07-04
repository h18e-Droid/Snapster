import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const { token } = await request.json()

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 })
  }
  const cookiesResponse = await cookies()
  cookiesResponse.set({
    name: "accessToken",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60, // 1 година
  })

  return NextResponse.json({ success: true })
}

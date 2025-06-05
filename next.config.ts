import type { NextConfig } from "next"

const nextConfig: NextConfig = {}

module.exports = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

export default nextConfig

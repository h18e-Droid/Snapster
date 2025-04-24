import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
}

module.exports = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

export default nextConfig

import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  distDir: isDev ? undefined : 'dist',
}

export default nextConfig

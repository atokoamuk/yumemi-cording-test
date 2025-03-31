import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  distDir: isDev ? undefined : "dist",
};

export default nextConfig;

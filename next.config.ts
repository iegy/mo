import type { NextConfig } from "next";

const configuredBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/$/,
  "",
);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: configuredBasePath,
  assetPrefix: configuredBasePath || undefined,
};

export default nextConfig;

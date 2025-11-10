import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Next resolves the project root correctly when there are other
  // lockfiles in parent directories (prevents mixing node_modules/Next instances).
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
};

export default nextConfig;

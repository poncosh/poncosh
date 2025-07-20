import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverRuntime: "nodejs",
  serverExternalPackages: ["sequelize", "pg", "pg-hstore"],
};

export default nextConfig;

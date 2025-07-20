import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sequelize", "pg", "pg-hstore"],
  webpack: (config) => {
    config.externals = [
      ...(typeof config.externals === "function"
        ? [config.externals]
        : config.externals || []),
      {
        sequelize: "commonjs sequelize",
        pg: "commonjs pg",
        "pg-hstore": "commonjs pg-hstore",
      },
    ];
    return config;
  },
};

export default nextConfig;

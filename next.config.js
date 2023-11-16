/** @type {import('next').NextConfig} */
const nextConfig = {
  extends: ["plugin:@next/next/recommended"],
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.protopie.ir",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000", // MinIO default port
        pathname: "/uploads/**", // match all uploads
      },
    ],
  },
};

module.exports = nextConfig;

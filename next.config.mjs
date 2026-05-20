/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Correct way to define wildcards for all domains
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/7.x/**',
      },
    ],
  },
  webpack: (config) => {
    config.externals = [...config.externals, { bufferutil: "bufferutil", "utf-8-validate": "utf-8-validate" }];
    return config;
  },
};

module.exports = nextConfig; 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.dicebear.com'], // For avatar images
  },
  webpack: (config) => {
    config.externals = [...config.externals, { bufferutil: "bufferutil", "utf-8-validate": "utf-8-validate" }];
    return config;
  },
}

module.exports = nextConfig 
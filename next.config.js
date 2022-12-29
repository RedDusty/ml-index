const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontEndNav: false,
  reloadOnOnline: false,
  register: true,
  cacheStartUrl: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  cleanDistDir: true,
  images: {
    domains: ['storage.googleapis.com']
  }
});

module.exports = nextConfig;

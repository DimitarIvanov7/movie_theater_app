/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    AUTHORIZATION_API: process.env.AUTHORIZATION_API,
    BOOKINGS_API: process.env.BOOKINGS_API,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ghuddy-live-attachments.s3.ap-southeast-1.amazonaws.com"]
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
    const nextConfig = {
      // Configure pageExtensions to include md and mdx
      pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
      // Optionally, add any other next.js config below
      reactStrictMode: true,
      swcMinify: true,
    }

    module.exports = nextConfig

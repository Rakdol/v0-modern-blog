/** @type {import('next').NextConfig} */
const pagesBasePath = (process.env.PAGES_BASE_PATH || '')
  .trim()
  .replace(/\/+$/, '')

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: pagesBasePath === '/' ? '' : pagesBasePath,
}

export default nextConfig

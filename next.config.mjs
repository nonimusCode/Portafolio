import path from "node:path"
import { fileURLToPath } from "node:url"
import createNextIntlPlugin from 'next-intl/plugin'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)))
const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
}

export default withNextIntl(nextConfig)

import path from "node:path"
import { fileURLToPath } from "node:url"

/** Carpeta donde está este next.config (el proyecto), siempre absoluta */
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)))

/**
 * Si hay otro lockfile en ~/projects (p. ej. package-lock.json), Next infiere mal la raíz
 * y Turbopack intenta resolver `tailwindcss` desde ahí. `outputFileTracingRoot` + `turbopack.root`
 * deben coincidir y apuntar a ESTE proyecto (docs: turbopack#root-directory).
 */
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

export default nextConfig

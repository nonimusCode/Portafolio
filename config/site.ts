import content from "@/constants/content.json"

/**
 * Metadatos y navegación derivados de `constants/content.json`.
 */
export const siteConfig = {
  name: content.site.name,
  title: content.site.title,
  description: content.site.description,
  lang: content.site.lang,
  navLinks: content.nav.links,
  ctaLabel: content.nav.ctaLabel,
  ctaHref: content.nav.ctaHref,
} as const

export type NavLink = (typeof siteConfig.navLinks)[number]

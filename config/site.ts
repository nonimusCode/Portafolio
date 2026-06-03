export const siteConfig = {
  name: "JPCF",
  ctaHref: "#contact",
  navHrefs: [
    { href: "#about", key: "about" as const },
    { href: "#projects", key: "projects" as const },
    { href: "#experience", key: "experience" as const },
    { href: "#ai", key: "ai" as const },
    { href: "#contact", key: "contact" as const },
  ],
} as const

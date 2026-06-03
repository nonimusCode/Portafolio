"use client"

import { useState } from "react"
import { useLocale, useTranslations } from 'next-intl'
import { siteConfig } from "@/config/site"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('nav')
  const locale = useLocale()
  const otherLocale = locale === 'en' ? 'es' : 'en'

  const navLinks = siteConfig.navHrefs.map(({ href, key }) => ({
    href,
    label: t(key),
  }))

  return (
    <nav className="fixed inset-x-0 top-0 z-100 box-border w-full max-w-full overflow-x-hidden border-b border-transparent bg-black/80 px-4 py-4 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur-md supports-backdrop-filter:bg-black/60 sm:px-6 md:px-10 md:py-6 lg:px-12">
      <div className="mx-auto flex w-full min-w-0 max-w-[1600px] items-center justify-between gap-3">
        <a
          href="#"
          className="min-w-0 shrink font-sans text-[clamp(16px,4.5vw,20px)] font-extrabold uppercase tracking-[0.12em] text-white sm:tracking-[0.15em]"
        >
          {siteConfig.name}
        </a>

        <div className="hidden md:flex md:items-center md:gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[12px] uppercase tracking-widest text-[rgba(255,255,255,0.7)] transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex md:items-center md:gap-3">
          <a
            href={siteConfig.ctaHref}
            className="border border-[rgba(255,255,255,0.2)] px-6 py-3 font-sans text-[13px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.7)] transition-all hover:border-white hover:text-white"
          >
            {t('cta')}
          </a>
          <a
            href={`/${otherLocale}`}
            className="border border-[rgba(255,255,255,0.15)] px-3 py-3 font-mono text-[11px] uppercase tracking-widest text-[rgba(255,255,255,0.5)] transition-all hover:border-white hover:text-white"
          >
            {t('switchLang')}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex shrink-0 min-h-11 min-w-11 items-center justify-center rounded-md text-white md:hidden"
          aria-expanded={isOpen}
          aria-label={t('toggleMenu')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 max-w-full overflow-x-hidden border-t border-[rgba(255,255,255,0.1)] pt-4 md:hidden">
          <div className="flex max-h-[min(70vh,calc(100dvh-8rem))] min-w-0 flex-col gap-1 overflow-x-hidden overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="min-h-12 max-w-full wrap-break-word rounded-md px-2 py-3 font-mono text-[12px] uppercase tracking-widest text-[rgba(255,255,255,0.85)] transition-colors active:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteConfig.ctaHref}
              onClick={() => setIsOpen(false)}
              className="mt-2 flex min-h-12 w-full max-w-full min-w-0 items-center justify-center rounded-md border border-[rgba(255,255,255,0.25)] px-4 py-3 text-center font-sans text-[13px] font-bold uppercase tracking-widest text-white"
            >
              {t('cta')}
            </a>
            <a
              href={`/${otherLocale}`}
              className="flex min-h-10 w-full max-w-full items-center justify-center rounded-md border border-[rgba(255,255,255,0.15)] px-4 py-2 text-center font-mono text-[11px] uppercase tracking-widest text-[rgba(255,255,255,0.5)]"
            >
              {t('switchLang')}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

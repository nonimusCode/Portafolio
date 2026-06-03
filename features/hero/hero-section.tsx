"use client"

import dynamic from "next/dynamic"

import content from "@/constants/content.json"

const { hero } = content

const IridescentDiamond = dynamic(
  () => import("./iridescent-diamond").then((mod) => mod.IridescentDiamond),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <img
          src={hero.placeholderImage}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-contain object-center"
        />
      </div>
    ),
  }
)

const titleLine = hero.titleSegments.join("\u00A0 | \u00A0")

export function HeroSection() {
  return (
    <section className="relative flex min-h-dvh flex-col overflow-x-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[64px_64px] opacity-[0.03]"
          aria-hidden
        />
      </div>
      <div className="relative z-10 grid w-full flex-1 grid-cols-1 gap-8 pb-24 pt-[max(6.5rem,calc(env(safe-area-inset-top)+5.25rem))] sm:gap-10 sm:pb-28 sm:pt-[min(12vh,5.5rem)] lg:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] lg:items-center lg:gap-x-8 lg:px-12 lg:pb-36 lg:pt-[min(10vh,5rem)] xl:grid-cols-[minmax(0,46rem)_minmax(0,1fr)] xl:gap-x-10">
        <div className="flex w-full min-w-0 flex-col items-start px-4 text-left sm:px-6 md:px-10 lg:px-0">
          <p className="mb-4 font-mono text-[10px] tracking-[0.18em] text-[rgba(255,255,255,0.38)] sm:mb-5 sm:text-[11px] sm:tracking-[0.2em]">
            {hero.name}
          </p>

          <h1
            className="hero-word font-sans text-balance font-bold leading-[1.15] tracking-[-0.02em] text-left text-[#9d8bd9] sm:leading-snug"
            style={{ fontSize: "clamp(1.05rem, 4.2vw + 0.2rem, 2.5rem)" }}
          >
            {titleLine}
          </h1>

          <p className="mt-6 max-w-xl font-mono text-[12px] leading-relaxed text-[rgba(255,255,255,0.45)] sm:mt-7 sm:text-[13px]">
            {hero.paragraph1}
          </p>
          <p className="mt-3 max-w-xl font-mono text-[12px] leading-relaxed text-[rgba(255,255,255,0.45)] sm:mt-4 sm:text-[13px]">
            {hero.paragraph2}
          </p>

          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={hero.ctaPrimaryHref}
              className="btn-gradient-hover min-h-12 content-center bg-white px-6 py-3.5 text-center font-sans text-[12px] font-bold uppercase tracking-widest text-black sm:min-h-0 sm:px-8 sm:py-4 sm:text-[13px]"
            >
              <span>{hero.ctaPrimary}</span>
            </a>
            <a
              href={hero.ctaSecondaryHref}
              className="min-h-12 content-center border border-[rgba(255,255,255,0.2)] px-6 py-3.5 text-center font-sans text-[12px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.85)] transition-all hover:border-white hover:text-white sm:min-h-0 sm:px-8 sm:py-4 sm:text-[13px]"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="relative mt-2 h-[min(40vh,380px)] min-h-[240px] w-full min-w-0 bg-black sm:mt-4 sm:h-[min(44vh,460px)] sm:min-h-[280px] md:min-h-[300px] lg:mt-0 lg:min-h-[min(86vh,780px)] lg:self-stretch">
          <IridescentDiamond />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-9 sm:gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.38)]">
          {hero.scrollHint}
        </span>
        <div className="h-8 w-px overflow-hidden bg-[rgba(255,255,255,0.2)]">
          <div className="h-full w-full bg-white scroll-line" />
        </div>
      </div>
    </section>
  )
}

"use client"

import { ScrollRevealText } from "@/components/ui/scroll-reveal-text"
import content from "@/constants/content.json"

const { projects } = content

export function ProjectsSection() {
  return (
    <section id="projects" className="section-y section-x bg-black">
      <div className="mx-auto max-w-7xl">
        <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-[rgba(255,255,255,0.38)] sm:text-[11px] sm:tracking-[0.3em]">
          {projects.label}
        </span>

        <h2 className="mt-5 font-sans text-[clamp(2.25rem,11vw,10rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em] sm:mt-6 sm:leading-none lg:text-[clamp(52px,10.8vw,160px)] mb-10 sm:mb-16">
          <ScrollRevealText as="span" className="block" fromMuted="rgba(255,255,255,0.35)">
            {projects.title}
          </ScrollRevealText>
        </h2>

        <div>
          {projects.items.map((project, index) => {
            const rowClass = `group flex flex-col gap-5 border-b border-[rgba(255,255,255,0.1)] py-7 transition-all hover:bg-[rgba(255,255,255,0.02)] sm:gap-6 sm:py-8 md:flex-row md:items-start md:gap-6 ${
              index === 0 ? "border-t border-[rgba(255,255,255,0.1)]" : ""
            } -mx-1 cursor-pointer rounded-lg px-3 no-underline outline-offset-2 sm:-mx-4 sm:px-4 focus-visible:ring-2 focus-visible:ring-white/30`

            const href =
              "href" in project && typeof (project as { href?: string }).href === "string"
                ? (project as { href?: string }).href
                : undefined

            const inner = (
              <>
                <span className="shrink-0 font-mono text-[clamp(2rem,8vw,3rem)] font-bold leading-none text-[rgba(255,255,255,0.1)] md:w-24 md:text-[48px]">
                  {project.number}
                </span>

                <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:items-start md:gap-8 lg:gap-10">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-sans text-[clamp(1.05rem,4vw,2rem)] font-extrabold uppercase tracking-tight md:text-[24px] lg:text-[32px]">
                      <ScrollRevealText as="span" className="block" fromMuted="rgba(255,255,255,0.35)">
                        {project.title}
                      </ScrollRevealText>
                    </h3>
                    <p className="mt-2 font-mono text-[12px] leading-relaxed text-[rgba(255,255,255,0.45)] sm:text-[13px]">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-[rgba(255,255,255,0.2)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-[rgba(255,255,255,0.5)] sm:px-3 sm:text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center justify-end md:pt-1">
                    <span className="text-lg text-white opacity-30 transition-all group-hover:translate-x-2 group-hover:opacity-100 sm:text-[20px]">
                      →
                    </span>
                  </div>
                </div>
              </>
            )

            if (href) {
              return (
                <a
                  key={project.number}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                  aria-label={`${project.title} — open on GitHub`}
                >
                  {inner}
                </a>
              )
            }

            return (
              <div key={project.number} className={rowClass}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

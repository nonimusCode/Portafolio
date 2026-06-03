"use client"

import { ScrollRevealText } from "@/components/ui/scroll-reveal-text"
import content from "@/constants/content.json"
import {
  Experience3DIcon,
  type ExperienceIconVariant,
} from "./experience-3d-icon"

const { experience } = content

export function ExperienceSection() {
  return (
    <section id="experience" className="section-y section-x bg-black">
      <div className="mx-auto max-w-7xl">
        <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-[rgba(255,255,255,0.38)] sm:text-[11px] sm:tracking-[0.3em]">
          {experience.label}
        </span>

        <h2 className="mb-10 mt-5 font-sans text-[clamp(1.75rem,6.5vw,3.5rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] sm:mb-16 sm:mt-6 sm:leading-none">
          <ScrollRevealText as="span" className="block" fromMuted="rgba(255,255,255,0.35)">
            {experience.title}
          </ScrollRevealText>
        </h2>

        <div className="relative">
          <div className="absolute bottom-3 left-[22px] top-3 w-px bg-[rgba(255,255,255,0.1)]" />

          <div className="space-y-10 sm:space-y-14">
            {experience.items.map((exp) => (
              <div key={exp.company} className="relative pl-17 sm:pl-20">
                <div className="absolute left-0 top-0">
                  <Experience3DIcon variant={exp.iconVariant as ExperienceIconVariant} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-sans text-[clamp(1.05rem,4.2vw,1.5rem)] font-extrabold uppercase sm:text-[24px]">
                    <ScrollRevealText as="span" className="block" fromMuted="rgba(255,255,255,0.35)">
                      {exp.company}
                    </ScrollRevealText>
                  </h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[rgba(255,255,255,0.45)] sm:text-[12px]">
                    {exp.role} · {exp.date}
                  </p>
                  <p className="mt-3 max-w-xl font-mono text-[12px] leading-[1.75] text-[rgba(255,255,255,0.45)] sm:mt-4 sm:text-[13px] sm:leading-[1.8]">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

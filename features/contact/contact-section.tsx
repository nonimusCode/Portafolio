"use client"

import { ScrollRevealText } from "@/components/ui/scroll-reveal-text"
import content from "@/constants/content.json"

const { contact } = content

export function ContactSection() {
  return (
    <section id="contact" className="section-y section-x bg-black">
      <div className="mx-auto w-full min-w-0 max-w-[900px] text-center">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-[rgba(255,255,255,0.38)] sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">
          {contact.label}
        </p>

        <div className="mb-8 w-full min-w-0 sm:mb-12">
          {contact.titleLines.map((line, i) => (
            <h2
              key={i}
              className="font-sans text-[clamp(1.15rem,4.25vw+0.65rem,2.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-balance wrap-break-word sm:text-[clamp(1.3rem,5vw,3.05rem)] md:text-[clamp(1.25rem,4.5vw,3rem)] lg:text-[clamp(1.35rem,5.25vw,3.5rem)] xl:text-[clamp(1.45rem,5.75vw,3.75rem)] 2xl:text-[clamp(1.75rem,9vw,5.25rem)]"
            >
              <ScrollRevealText
                as="span"
                className="block max-w-full"
                fromMuted="rgba(255,255,255,0.35)"
              >
                {line}
              </ScrollRevealText>
            </h2>
          ))}
        </div>

        <div className="overflow-hidden border-y border-[rgba(255,255,255,0.1)] py-5 sm:py-6">
          <div className="marquee-container">
            <div className="marquee-content">
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="mx-5 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-[rgba(255,255,255,0.15)] sm:mx-8 sm:text-[10px] sm:tracking-[0.2em]"
                >
                  {contact.marquee}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mx-auto sm:mt-12 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
          <a
            href={contact.emailHref}
            className="btn-gradient-hover flex min-h-12 w-full items-center justify-center bg-white px-6 py-3 font-sans text-[12px] font-bold uppercase tracking-widest text-black sm:w-auto sm:px-9 sm:py-4 sm:text-[13px]"
          >
            <span className="break-all text-center sm:break-normal">{contact.email}</span>
          </a>
          <a
            href={contact.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 w-full items-center justify-center gap-2 border border-[rgba(255,255,255,0.2)] px-6 py-3 font-sans text-[12px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.7)] transition-all hover:border-white hover:text-white sm:w-auto sm:px-9 sm:py-4 sm:text-[13px]"
          >
            {contact.linkedinLabel} <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}

"use client"

import { ScrollRevealText } from "@/components/ui/scroll-reveal-text"
import content from "@/constants/content.json"
import type { ReactNode } from "react"

const { ai } = content

const capabilityIcons: Record<string, ReactNode> = {
  rag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
      />
    </svg>
  ),
  agents: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
      />
    </svg>
  ),
  mcp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
      />
    </svg>
  ),
  llmops: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
      />
    </svg>
  ),
}

export function AISection() {
  return (
    <section id="ai" className="section-y section-x bg-black">
      <div className="mx-auto max-w-7xl">
        <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-[rgba(255,255,255,0.38)] sm:text-[11px] sm:tracking-[0.3em]">
          {ai.label}
        </span>

        <h2 className="mb-10 mt-5 font-sans text-[clamp(1.75rem,6.5vw,3.5rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] sm:mb-16 sm:mt-6 sm:leading-none">
          {ai.titleLines.map((line, i) => (
            <span key={line}>
              {i > 0 ? <br /> : null}
              <ScrollRevealText as="span" className="block" fromMuted="rgba(255,255,255,0.35)">
                {line}
              </ScrollRevealText>
            </span>
          ))}
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
          {ai.capabilities.map((cap) => (
            <div
              key={cap.id}
              className="border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] p-6 transition-all duration-300 hover:border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.04)] sm:p-8"
            >
              <div className="mb-4 text-white sm:mb-5">{capabilityIcons[cap.id]}</div>

              <h3 className="mb-2 font-sans text-[13px] font-bold uppercase tracking-widest sm:mb-3 sm:text-[14px]">
                <ScrollRevealText as="span" className="block" fromMuted="rgba(255,255,255,0.35)">
                  {cap.title}
                </ScrollRevealText>
              </h3>

              <p className="font-mono text-[12px] leading-[1.65] text-[rgba(255,255,255,0.45)] sm:text-[13px] sm:leading-[1.6]">
                {cap.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(255,255,255,0.3)] sm:mt-10 sm:text-[11px] sm:tracking-[0.2em]">
          {ai.footerNote}
        </p>
      </div>
    </section>
  )
}

"use client"

import { ScrollRevealText } from "@/components/ui/scroll-reveal-text"
import content from "@/constants/content.json"
import { useEffect, useRef, useState } from "react"

const { about } = content

interface StatCardProps {
  value: string
  label: string
  delay: number
}

function StatCard({ value, label, delay }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const numericValue = parseInt(value.replace(/\D/g, ""))
  const suffix = value.replace(/\d/g, "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const timeout = setTimeout(() => {
      const duration = 1500
      const steps = 30
      const increment = numericValue / steps
      let current = 0

      const interval = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setCount(numericValue)
          clearInterval(interval)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [isVisible, numericValue, delay])

  return (
    <div
      ref={ref}
      className="flex flex-col border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] p-5 transition-all duration-300 hover:border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.04)] sm:p-7"
    >
      <span className="font-sans text-[clamp(2.5rem,12vw,3.5rem)] font-extrabold leading-none text-white sm:text-[56px]">
        {count}
        {suffix}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[rgba(255,255,255,0.38)] mt-2">
        {label}
      </span>
    </div>
  )
}

const ABOUT_TITLE_PASTEL = { r: 168, g: 200, b: 240 } as const
const ABOUT_TITLE_MUTED = "rgba(168, 200, 240, 0.22)"

export function AboutSection() {
  return (
    <section id="about" className="section-y section-x bg-black">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="lg:w-[60%]">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[rgba(255,255,255,0.38)] sm:text-[11px] sm:tracking-[0.3em]">
              {about.label}
            </span>

            <div className="mt-5 mb-6 space-y-0 leading-[0.95] sm:mt-6 sm:mb-8">
              {about.headlineWords.map((word, index) => (
                <div
                  key={index}
                  className="font-sans text-[clamp(2rem,9vw,4.5rem)] font-extrabold uppercase sm:text-[clamp(48px,8vw,72px)]"
                >
                  <ScrollRevealText
                    className="block"
                    as="span"
                    fromMuted={ABOUT_TITLE_MUTED}
                    toRgb={ABOUT_TITLE_PASTEL}
                  >
                    {word}
                  </ScrollRevealText>
                </div>
              ))}
            </div>

            <p className="max-w-[480px] font-mono text-[12px] leading-[1.75] text-[rgba(255,255,255,0.45)] sm:text-[13px] sm:leading-[1.8]">
              {about.body}
            </p>
          </div>

          <div className="lg:w-[40%]">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {about.stats.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  delay={stat.delay}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

type Rgb = { r: number; g: number; b: number }

type ScrollRevealTextProps = {
  children: ReactNode
  className?: string
  /** Gris base; el revelado usa varios pasos para un degradado suave (no un corte duro) */
  fromMuted?: string
  /** Color final del revelado (por defecto blanco) */
  toRgb?: Rgb
  as?: keyof JSX.IntrinsicElements
}

/** Ancho aproximado de la zona difuminada entre blanco y gris (% del gradiente) */
const FEATHER = 28
/** Diagonal tipo referencia: claro arriba-izquierda, más oscuro abajo-derecha */
const GRADIENT_ANGLE = 118

function buildSoftGradient(progress01: number, fromMuted: string, to: Rgb): string {
  const { r, g, b } = to
  const p = progress01 * 100

  if (p <= 0.5) {
    return `linear-gradient(${GRADIENT_ANGLE}deg, ${fromMuted} 0%, ${fromMuted} 100%)`
  }
  if (p >= 99.5) {
    return `linear-gradient(${GRADIENT_ANGLE}deg, rgb(${r},${g},${b}) 0%, rgb(${r},${g},${b}) 100%)`
  }

  const S = FEATHER
  const leftWhiteEnd = Math.max(0, p - S)

  // Fase inicial: aún no hay franja de color puro a la izquierda; solo mezcla suave
  if (leftWhiteEnd < 0.5) {
    const t = p / S
    const g1 = 8 + t * 14
    const g2 = 16 + t * 22
    const g3 = Math.min(100, p + S * 0.85)
    return `linear-gradient(${GRADIENT_ANGLE}deg,
      ${fromMuted} 0%,
      rgba(${r},${g},${b},${0.15 + t * 0.35}) ${g1}%,
      rgba(${r},${g},${b},${0.42 + t * 0.35}) ${g2}%,
      rgba(${r},${g},${b},0.88) ${p + S * 0.22}%,
      ${fromMuted} ${g3}%,
      ${fromMuted} 100%)`
  }

  const rightGrayStart = Math.min(100, p + S)
  const midSoftA = leftWhiteEnd + (p - leftWhiteEnd) * 0.4
  const midSoftB = p + (rightGrayStart - p) * 0.48

  return `linear-gradient(${GRADIENT_ANGLE}deg,
    rgb(${r},${g},${b}) 0%,
    rgb(${r},${g},${b}) ${leftWhiteEnd}%,
    rgba(${r},${g},${b},0.78) ${midSoftA}%,
    rgba(${r},${g},${b},0.42) ${p}%,
    rgba(${r},${g},${b},0.16) ${midSoftB}%,
    ${fromMuted} ${rightGrayStart}%,
    ${fromMuted} 100%)`
}

/**
 * Texto que empieza gris y gana blanco con el scroll mediante un degradado suave
 * (no un salto lineal duro), en diagonal similar a referencias editoriales.
 */
const DEFAULT_TO: Rgb = { r: 255, g: 255, b: 255 }

export function ScrollRevealText({
  children,
  className = "",
  fromMuted = "rgba(255,255,255,0.38)",
  toRgb = DEFAULT_TO,
  as = "span",
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.92
      const end = vh * 0.32
      const t = (start - rect.top) / (start - end)
      setProgress(Math.min(1, Math.max(0, t)))
    }

    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    update()

    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const style: CSSProperties = {
    backgroundImage: buildSoftGradient(progress, fromMuted, toRgb),
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
  }

  return createElement(as, { ref, className, style }, children)
}

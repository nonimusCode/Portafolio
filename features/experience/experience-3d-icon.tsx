"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export type ExperienceIconVariant = "diamond" | "ring" | "crystal"

type Experience3DIconProps = {
  variant: ExperienceIconVariant
  className?: string
}

function getVariantPalette(variant: ExperienceIconVariant) {
  switch (variant) {
    case "diamond":
      return {
        core: "#67e8f9",
        attenuation: "#d6f0ff",
        a: "rgba(14,165,233,0.52)", // #0ea5e9
        b: "rgba(34,211,238,0.44)", // #22d3ee
        fill: 0x0ea5e9,
        warm: 0x3b82f6,
        emissive: "#0ea5e9",
      }
    case "ring":
      return {
        core: "#fdba74",
        attenuation: "#ffe5d0",
        a: "rgba(249,115,22,0.5)", // #f97316
        b: "rgba(245,158,11,0.42)", // #f59e0b
        fill: 0xf97316,
        warm: 0xf59e0b,
        emissive: "#f97316",
      }
    case "crystal":
      return {
        core: "#c4b5fd",
        attenuation: "#e9d5ff",
        a: "rgba(124,58,237,0.48)", // #7c3aed
        b: "rgba(168,85,247,0.42)", // #a855f7
        fill: 0x7c3aed,
        warm: 0x60a5fa,
        emissive: "#7c3aed",
      }
    default:
      return {
        core: "#dbeafe",
        attenuation: "#dbeafe",
        a: "rgba(14,165,233,0.42)",
        b: "rgba(249,115,22,0.36)",
        fill: 0x0ea5e9,
        warm: 0xf97316,
        emissive: "#0ea5e9",
      }
  }
}

function createMiniEnvTexture(variant: ExperienceIconVariant): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    const t = new THREE.CanvasTexture(canvas)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }

  const palette = getVariantPalette(variant)
  ctx.fillStyle = "#03060c"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const baseGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  baseGrad.addColorStop(0, "rgba(8,12,20,0.9)")
  baseGrad.addColorStop(0.52, "rgba(4,8,16,0.82)")
  baseGrad.addColorStop(1, "rgba(2,4,10,0.95)")
  ctx.fillStyle = baseGrad
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const glowA = ctx.createRadialGradient(360, 88, 0, 360, 88, 140)
  glowA.addColorStop(0, palette.a)
  glowA.addColorStop(0.55, "rgba(255,255,255,0.12)")
  glowA.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = glowA
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const glowB = ctx.createRadialGradient(176, 176, 0, 176, 176, 128)
  glowB.addColorStop(0, palette.b)
  glowB.addColorStop(0.55, "rgba(255,255,255,0.1)")
  glowB.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = glowB
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const texture = new THREE.CanvasTexture(canvas)
  texture.mapping = THREE.EquirectangularReflectionMapping
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function makeGeometry(variant: ExperienceIconVariant): THREE.BufferGeometry {
  switch (variant) {
    case "diamond":
      return new THREE.OctahedronGeometry(0.72, 1)
    case "ring":
      /** Menos segmentos: ícono ~44px; 140×24 era excesivo para el tamaño en pantalla */
      return new THREE.TorusKnotGeometry(0.44, 0.14, 64, 12)
    case "crystal":
      return new THREE.DodecahedronGeometry(0.68, 0)
    default:
      return new THREE.IcosahedronGeometry(0.68, 0)
  }
}

export function Experience3DIcon({ variant, className = "" }: Experience3DIconProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const size = Math.max(38, Math.min(container.clientWidth || 44, container.clientHeight || 44))
    const palette = getVariantPalette(variant)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0, 3.5)

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
      stencil: false,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25))
    renderer.setSize(size, size)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.06
    renderer.domElement.style.display = "block"
    container.appendChild(renderer.domElement)

    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()
    const envTexture = createMiniEnvTexture(variant)
    const envRT = pmrem.fromEquirectangular(envTexture)
    scene.environment = envRT.texture

    scene.add(new THREE.AmbientLight(0xffffff, 0.25))
    const key = new THREE.DirectionalLight(0xffffff, 0.52)
    key.position.set(1.8, 2.2, 2.4)
    scene.add(key)
    const fill = new THREE.DirectionalLight(palette.fill, 0.5)
    fill.position.set(-1.6, 1.2, 1.4)
    scene.add(fill)
    const warm = new THREE.DirectionalLight(palette.warm, 0.38)
    warm.position.set(0.2, -1.6, 1.3)
    scene.add(warm)
    const accent = new THREE.PointLight(palette.fill, 0.75, 6)
    accent.position.set(-0.9, 0.8, 1.5)
    scene.add(accent)
    const accent2 = new THREE.PointLight(palette.warm, 0.62, 6)
    accent2.position.set(1.1, -0.5, 1.2)
    scene.add(accent2)

    const geometry = makeGeometry(variant)
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(palette.core),
      metalness: 0,
      roughness: 0.03,
      transmission: 0.72,
      thickness: 0.14,
      ior: 1.16,
      clearcoat: 1,
      clearcoatRoughness: 0.025,
      reflectivity: 1,
      envMapIntensity: 3.4,
      attenuationDistance: 6,
      attenuationColor: new THREE.Color(palette.attenuation),
      iridescence: 0.95,
      iridescenceIOR: 1.03,
      iridescenceThicknessRange: [180, 760],
      emissive: new THREE.Color(palette.emissive),
      emissiveIntensity: 0.22,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.set(-0.2, 0.55, 0.14)
    scene.add(mesh)

    let frame = 0
    const spin = variant === "ring" ? 0.018 : 0.013
    const wobble = variant === "crystal" ? 0.95 : 0.6
    let raf = 0
    let shouldRender = true

    const io = new IntersectionObserver(
      ([entry]) => {
        shouldRender = entry.isIntersecting && entry.intersectionRatio > 0
      },
      { rootMargin: "48px", threshold: 0 }
    )
    io.observe(container)

    const onVisibility = () => {
      if (document.hidden) shouldRender = false
      else {
        const r = container.getBoundingClientRect()
        shouldRender = r.bottom > 0 && r.top < window.innerHeight
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (!shouldRender) return
      frame += 1
      mesh.rotation.y += spin
      mesh.rotation.x = -0.2 + Math.sin(frame * 0.016) * 0.16 * wobble
      mesh.rotation.z = 0.14 + Math.sin(frame * 0.01) * 0.08
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      cancelAnimationFrame(raf)
      geometry.dispose()
      material.dispose()
      envTexture.dispose()
      envRT.dispose()
      pmrem.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [variant])

  return <div ref={containerRef} className={`h-11 w-11 rounded-full ${className}`} aria-hidden />
}

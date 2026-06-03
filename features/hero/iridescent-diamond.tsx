"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js"

import content from "@/constants/content.json"

function createIridescentEquirectTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  /** 1024×512: suficiente para PMREM; menos trabajo en CPU/GPU que 2048×1024 */
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas)
    fallback.colorSpace = THREE.SRGBColorSpace
    return fallback
  }

  /** Misma composición que a 2048×1024, pero raster a mitad de píxeles */
  ctx.scale(0.5, 0.5)

  ctx.fillStyle = "#080b12"
  ctx.fillRect(0, 0, 2048, 1024)
  const bgGrad = ctx.createRadialGradient(1440, 420, 120, 1024, 540, 920)
  bgGrad.addColorStop(0, "rgba(22,30,52,0.95)")
  bgGrad.addColorStop(0.5, "rgba(8,12,20,0.85)")
  bgGrad.addColorStop(1, "rgba(5,7,12,1)")
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, 2048, 1024)
  ctx.globalCompositeOperation = "screen"

  const drawRibbon = (
    colors: string[],
    start: [number, number],
    c1: [number, number],
    c2: [number, number],
    end: [number, number],
    width: number,
    blur: number
  ) => {
    const grad = ctx.createLinearGradient(start[0], start[1], end[0], end[1])
    const step = 1 / Math.max(colors.length - 1, 1)
    colors.forEach((color, i) => grad.addColorStop(i * step, color))
    ctx.strokeStyle = grad
    ctx.lineWidth = width
    ctx.lineCap = "round"
    ctx.shadowBlur = blur
    ctx.shadowColor = colors[Math.floor(colors.length / 2)]
    ctx.beginPath()
    ctx.moveTo(start[0], start[1])
    ctx.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], end[0], end[1])
    ctx.stroke()
    ctx.shadowBlur = 0
  }

  drawRibbon(
    ["#0ea5e9", "#22d3ee", "#f59e0b", "#3b82f6", "#7c3aed"],
    [120, 740],
    [620, 300],
    [1300, 680],
    [1900, 280],
    160,
    42
  )
  drawRibbon(
    ["#f97316", "#06b6d4", "#60a5fa", "#a855f7"],
    [60, 430],
    [520, 840],
    [1400, 180],
    [2000, 560],
    110,
    30
  )
  drawRibbon(
    ["#f8fafc", "#cbd5e1", "#ffffff"],
    [260, 520],
    [640, 520],
    [1480, 520],
    [1830, 460],
    42,
    16
  )
  drawRibbon(
    ["#ffffff", "#dbeafe", "#ffffff"],
    [180, 240],
    [720, 80],
    [1460, 300],
    [1980, 180],
    76,
    24
  )
  drawRibbon(
    ["#f8fafc", "#ffffff", "#f1f5f9"],
    [120, 880],
    [760, 720],
    [1360, 940],
    [1940, 760],
    68,
    20
  )

  const texture = new THREE.CanvasTexture(canvas)
  texture.mapping = THREE.EquirectangularReflectionMapping
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createBladeGeometry(): THREE.BufferGeometry {
  return new RoundedBoxGeometry(1.25, 1.25, 1.25, 8, 0.18)
}

function createBladeCrystal(
  material: THREE.MeshPhysicalMaterial
): { group: THREE.Group; geometries: THREE.BufferGeometry[] } {
  const group = new THREE.Group()
  const geometries: THREE.BufferGeometry[] = []

  const geometry = createBladeGeometry()
  geometries.push(geometry)
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.set(-0.24, 0.66, 0.22)
  group.add(cube)

  group.scale.set(0.82, 0.82, 0.82)
  return { group, geometries }
}

export function IridescentDiamond() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const [modelReady, setModelReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth || 500
    const height = container.clientHeight || 500

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100)
    camera.position.set(0, 0.04, 5.2)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
    })
    renderer.setSize(width, height)
    /** Cap DPR: MeshPhysical + transmisión es caro; 1.5 suele verse igual de nítido */
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.setClearAlpha(0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    const canvas = renderer.domElement
    canvas.style.background = "transparent"
    canvas.style.display = "block"
    canvas.style.position = "absolute"
    canvas.style.inset = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.zIndex = "1"
    container.appendChild(canvas)

    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()
    const envTexture = createIridescentEquirectTexture()
    const envRT = pmremGenerator.fromEquirectangular(envTexture)
    scene.environment = envRT.texture
    // Sin scene.background: fuera de un plano pequeño el canvas es transparente → mismo #000 que la columna.
    scene.background = null

    /** Plano compacto solo detrás del cubo: no llena el viewport, así no se ve “cuadro” de degradado en el borde del canvas. */
    const backdropGeo = new THREE.PlaneGeometry(4.6, 4.6)
    const backdropMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      toneMapped: false,
      depthWrite: true,
    })
    const backdrop = new THREE.Mesh(backdropGeo, backdropMat)
    backdrop.position.set(0, 0, -5.05)
    backdrop.renderOrder = -1
    scene.add(backdrop)

    const key = new THREE.DirectionalLight(0xffffff, 0.45)
    key.position.set(2.5, 2.2, 2.8)
    scene.add(key)

    const fill = new THREE.DirectionalLight(0x8fd4ff, 0.35)
    fill.position.set(-2.2, 1.4, 1.6)
    scene.add(fill)

    const warm = new THREE.DirectionalLight(0xffb56a, 0.22)
    warm.position.set(0.4, -1.8, 1.4)
    scene.add(warm)

    const hemi = new THREE.HemisphereLight(0xc7e6ff, 0x1a2438, 0.28)
    scene.add(hemi)

    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#c8d4e8"),
      metalness: 0,
      roughness: 0.018,
      transmission: 0.98,
      thickness: 0.045,
      ior: 1.12,
      attenuationDistance: 12,
      attenuationColor: new THREE.Color("#e8eef8"),
      reflectivity: 1,
      envMapIntensity: 3.4,
      clearcoat: 1,
      clearcoatRoughness: 0.012,
      iridescence: 0.92,
      iridescenceIOR: 1.03,
      iridescenceThicknessRange: [190, 680],
      flatShading: false,
      side: THREE.DoubleSide,
    })

    const { group: crystal, geometries } = createBladeCrystal(material)
    crystal.renderOrder = 0
    scene.add(crystal)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseRef.current.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    window.addEventListener("mousemove", handleMouseMove)

    let shouldRender = true
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        shouldRender = entry.isIntersecting && entry.intersectionRatio > 0
      },
      { root: null, rootMargin: "80px", threshold: 0 }
    )
    intersectionObserver.observe(container)

    const onVisibility = () => {
      if (document.hidden) shouldRender = false
      else {
        const r = container.getBoundingClientRect()
        shouldRender = r.bottom > 0 && r.top < window.innerHeight
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    let animationId: number
    let time = 0

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      if (!shouldRender) return

      time += 0.016

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04

      crystal.rotation.y = 0.52 + time * 0.11 + mouseRef.current.x * 0.16
      crystal.rotation.x = -0.12 + Math.sin(time * 0.05) * 0.035 + mouseRef.current.y * 0.06
      crystal.rotation.z = 0.42 + Math.sin(time * 0.03) * 0.018
      crystal.position.y = Math.sin(time * 0.24) * 0.028

      renderer.render(scene, camera)
    }

    /** Primer frame en el hilo principal: el modelo ya está listo para mostrarse */
    renderer.render(scene, camera)
    setModelReady(true)

    animate()

    const handleResize = () => {
      const newWidth = container.clientWidth || 500
      const newHeight = container.clientHeight || 500
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      cancelAnimationFrame(animationId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      envTexture.dispose()
      pmremGenerator.dispose()
      envRT.dispose()
      geometries.forEach((geometry) => geometry.dispose())
      backdropGeo.dispose()
      backdropMat.dispose()
      material.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full min-h-[280px] w-full bg-black"
      style={{ zIndex: 1 }}
      aria-hidden
    >
      <img
        src={content.hero.placeholderImage}
        alt=""
        decoding="async"
        fetchPriority="high"
        className={
          "pointer-events-none absolute inset-0 z-2 h-full w-full object-contain object-center transition-opacity duration-500 ease-out " +
          (modelReady ? "opacity-0" : "opacity-100")
        }
      />
    </div>
  )
}

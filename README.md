# Portfolio — Next.js (App Router)

Sitio estático tipo portfolio construido con **Next.js 16**, **React 19** y **TypeScript**. Gestión de dependencias con **pnpm**.

## Requisitos

- Node.js 20+ (recomendado LTS)
- [pnpm](https://pnpm.io/installation) (`corepack enable` + `corepack prepare pnpm@latest --activate`)

## Comandos

```bash
pnpm install
pnpm dev      # desarrollo en http://localhost:3000
pnpm build
pnpm start    # producción tras build
pnpm lint     # ESLint (requiere toolchain configurada)
```

---

## Arquitectura frontend (nivel senior)

El código sigue una **separación por capas** alineada con buenas prácticas en **Next.js App Router**: la carpeta `app/` solo orquesta rutas y layouts; el dominio de negocio de la UI vive en **features**; lo reutilizable y sin lógica de producto en **shared** y **components/ui**; la configuración estable en **config**.

### Principios

1. **App como capa delgada** — `app/page.tsx` compone bloques importados desde `@/features`; no contiene lógica de secciones ni datos de negocio.
2. **Features por vertical slice** — Cada carpeta bajo `features/<nombre>/` agrupa lo necesario para una parte del producto (navbar, hero, about, etc.), con **barrel** `index.ts` que define la API pública del módulo.
3. **Un solo origen de verdad para copy y navegación** — `config/site.ts` centraliza título, descripción SEO, enlaces del menú y CTAs; el layout y el navbar consumen esa configuración.
4. **Design system aislado** — `components/ui/` es la capa de primitivas (patrón **shadcn/ui** + Radix); las features pueden importar desde ahí sin mezclar responsabilidades.
5. **Utilidades puras** — `lib/` para helpers (p. ej. `cn`); hooks transversales en `hooks/` o, si crecen, bajo `shared/hooks/`.
6. **Proveedores globales** — `shared/providers/` para envoltorios de contexto (p. ej. `ThemeProvider` con `next-themes`) cuando se usen en el árbol de React.

### Mapa de carpetas

| Ruta | Rol |
|------|-----|
| `app/` | Rutas, `layout.tsx`, estilos globales de la app (`globals.css`), metadatos que delegan en `config/site.ts`. |
| `features/` | Módulos de producto: cada subcarpeta expone componentes públicos vía `index.ts`. |
| `config/` | Constantes de sitio y contratos de configuración (navegación, SEO). |
| `components/ui/` | Componentes de UI genéricos (design system); mantener alineado con `components.json` (shadcn). |
| `shared/` | Código compartido no ligado a una feature concreta (p. ej. `providers/`). |
| `lib/` | Utilidades y funciones puras. |
| `hooks/` | Hooks reutilizables. |
| `public/` | Assets estáticos servidos tal cual. |

### Flujo de dependencias (regla)

```
app/  →  features/  →  components/ui/, lib/, hooks/
         ↘ config/
```

Las **features** no deben importar unas a otras salvo casos muy justificados; la composición ocurre en **`app/page.tsx`** (o en layouts/páginas futuras). Así se limita el acoplamiento y se facilita extraer o borrar un módulo entero.

### Convenciones sugeridas al crecer el proyecto

- Añadir **`types/`** o `features/<x>/types.ts` para modelos compartidos cuando aparezcan APIs o datos tipados.
- Rutas nuevas: nuevos segmentos bajo `app/` que importen features existentes o nuevas carpetas en `features/`.
- Datos remotos: capa **`services/`** o `lib/api/` con funciones de fetch y validación (p. ej. Zod); los componentes de feature solo consumen datos ya validados.

---

## Stack principal

- Next.js (App Router), React, TypeScript  
- Estilos: Tailwind CSS v4  
- UI: Radix + componentes tipo shadcn en `components/ui/`  
- Gráficos 3D en hero: Three.js (carga diferida en `features/hero/`)

---

## Licencia

Privado — ajusta según tu caso.

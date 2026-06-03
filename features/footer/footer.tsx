import content from "@/constants/content.json"

const { footer } = content

export function Footer() {
  return (
    <footer className="section-x border-t border-[rgba(255,255,255,0.1)] bg-black py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:gap-4 sm:text-left">
        <span className="font-mono text-[11px] text-[rgba(255,255,255,0.38)] uppercase tracking-widest">
          {footer.copyright}
        </span>
        <span className="font-mono text-[11px] text-[rgba(255,255,255,0.38)] uppercase tracking-widest">
          {footer.credit}
        </span>
      </div>
    </footer>
  )
}

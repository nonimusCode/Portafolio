import dynamic from "next/dynamic"

import { Navbar, HeroSection } from "@/features"

const AboutSection = dynamic(() =>
  import("@/features/about/about-section").then((m) => ({ default: m.AboutSection }))
)
const ProjectsSection = dynamic(() =>
  import("@/features/projects/projects-section").then((m) => ({ default: m.ProjectsSection }))
)
const AISection = dynamic(() =>
  import("@/features/ai/ai-section").then((m) => ({ default: m.AISection }))
)
const ExperienceSection = dynamic(() =>
  import("@/features/experience/experience-section").then((m) => ({
    default: m.ExperienceSection,
  }))
)
const ContactSection = dynamic(() =>
  import("@/features/contact/contact-section").then((m) => ({ default: m.ContactSection }))
)
const Footer = dynamic(() =>
  import("@/features/footer/footer").then((m) => ({ default: m.Footer }))
)

export default function Home() {
  return (
    <main className="min-h-screen max-w-full overflow-x-hidden bg-black">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <AISection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

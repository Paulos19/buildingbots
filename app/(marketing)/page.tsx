import { HeroParallax } from "@/components/sections/hero-parallax"
import { AutomationSection } from "@/components/sections/automation-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"

export default async function LandingPage() {
  return (
    <>
      <HeroParallax />
      <AutomationSection />
      
      {/* O Server Component lida com a suspensão de dados automaticamente */}
      <PortfolioSection />
    </>
  )
}
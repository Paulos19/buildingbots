import { HeroParallax } from "@/components/sections/hero-parallax"
import { AboutSection } from "@/components/sections/about-section"
import { AutomationSection } from "@/components/sections/automation-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { CTASection } from "@/components/sections/cta-section"
import { Footer } from "@/components/sections/footer"

export default async function LandingPage() {
  return (
    <>
      <HeroParallax /> 
      <AutomationSection />
      <AboutSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  )
}
import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ServicesGrid } from "@/components/home/services-grid";
import { ContactCTA } from "@/components/home/contact-cta";
import { FaqSection } from "@/components/home/faq-section";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ServicesGrid />
      <ContactCTA />
      <FaqSection />
    </>
  );
}

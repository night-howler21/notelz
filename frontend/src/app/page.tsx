import CoverPage from "@/components/home/CoverPage";
import AboutSection from "@/components/home/AboutSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import SiteFooter from "@/components/home/SiteFooter";

export default function Home() {
  return (
    <>
      <main>
        <CoverPage />
        <AboutSection />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <SiteFooter />
    </>
  );
}

import CoverPage from "@/components/home/CoverPage";
import AboutSection from "@/components/home/AboutSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import SiteFooter from "@/components/home/SiteFooter";
import SupportingTabsSection from "@/components/home/SupportingTabsSection";

export default function Home() {
  return (
    <>
      <main
        style={{
          background:
            "linear-gradient(to bottom, #EAF3E5 0%, #CDE3C4 16%, #E7EBD8 32%, #F6F1E7 46%, #F6F1E7 56%, #DCEAD3 70%, #C9DFC0 84%, #EAF3E5 100%)",
        }}
      >
        <CoverPage />
        <AboutSection />
        <FeaturesSection />
        <HowItWorksSection />
        <SupportingTabsSection />
      </main>
      <SiteFooter />
    </>
  );
}

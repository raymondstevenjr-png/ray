import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import HowItWorks from "@/components/landing/HowItWorks";
import BusinessTypes from "@/components/landing/BusinessTypes";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FounderSection from "@/components/landing/FounderSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <BusinessTypes />
        <Testimonials />
        <Pricing />
        <FounderSection />
      </main>
      <Footer />
    </>
  );
}

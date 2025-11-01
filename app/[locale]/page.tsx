import Hero from "@/components/home/Hero";
import HowWeWork from "@/components/home/HowWeWork";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesSection from "@/components/home/ServicesSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTASection from "@/components/home/FinalCTASection";
// import Benefits from "@/components/home/Benefits";
// import ServiceSteps from "@/components/home/ServiceSteps";
// import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <HowWeWork />
      <WhyChooseUs />
      <ServicesSection />
      <FAQSection />
      <FinalCTASection />
      {/* <Benefits /> */}
      {/* <ServiceSteps /> */}
      {/* <CTASection /> */}
    </>
  );
}

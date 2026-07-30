import { Hero } from "@/components/sections/home/Hero";
import { QuickAccess } from "@/components/sections/home/QuickAccess";
import { Pillars } from "@/components/sections/home/Pillars";
import { NeedsGrid } from "@/components/sections/home/NeedsGrid";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { DigitalCta } from "@/components/sections/home/DigitalCta";
import { FaqSecurity } from "@/components/sections/home/FaqSecurity";
import { ContactStrip } from "@/components/sections/ContactStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickAccess />
      <Pillars />
      <NeedsGrid />
      <HowItWorks />
      <DigitalCta />
      <FaqSecurity />
      <ContactStrip />
    </>
  );
}

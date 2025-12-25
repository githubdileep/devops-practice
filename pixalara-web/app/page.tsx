import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee"; // The new component
import Services from "@/components/Services";
import Process from "@/components/Process";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandMarquee /> {/* Adds the infinite logo scroll right after the Hero */}
      <Services />
      <Process />
    </main>
  );
}
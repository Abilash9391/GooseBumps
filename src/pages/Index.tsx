import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TaglineSection } from "@/components/TaglineSection";
import { VisionSection } from "@/components/VisionSection";
import { EventsSection } from "@/components/EventsSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroCarousel />
      <TaglineSection />
      <VisionSection />
      <EventsSection />
      <ScheduleSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;

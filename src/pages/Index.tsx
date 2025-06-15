
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ContactSection } from "@/components/sections/ContactSection";


const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-body p-2 sm:p-4">
      <Header />
      <main className="flex-grow rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

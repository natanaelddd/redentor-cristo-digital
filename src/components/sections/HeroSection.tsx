
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type SiteContent = {
  [key: string]: string | undefined;
};

interface Slide {
  id: string;
  category: string;
  title: string;
  description?: string;
  button_text: string;
  order: number;
  is_active: boolean;
}

interface HeroSectionProps {
  slides?: Slide[];
  siteContent?: SiteContent;
}

export const HeroSection = ({ slides = [], siteContent = {} }: HeroSectionProps) => {
  // Slides padrão caso não haja dados do banco
  const defaultSlides: Slide[] = [
    {
      id: '1',
      category: 'Bem-vindos',
      title: 'Igreja Missionária do Cristo Redentor',
      description: 'Um lugar de fé, esperança e amor no coração de Ribeirão Preto. Venha fazer parte da nossa família!',
      button_text: 'Conheça mais',
      order: 1,
      is_active: true
    }
  ];

  const slidesToUse = slides && slides.length > 0 ? slides : defaultSlides;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070&auto=format&fit=crop')`
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white pt-24">
        <div className="max-w-5xl mx-auto">
          {slidesToUse.map((slide, index) => (
            <div key={slide.id} className={index === 0 ? "block" : "hidden"}>
              <p className="text-primary text-sm md:text-base uppercase tracking-[0.4em] font-light mb-8 opacity-90">
                {slide.category}
              </p>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-12 leading-tight tracking-tight">
                IGREJA<br />
                <span className="font-serif italic">Missionária</span><br />
                DO CRISTO<br />
                <span className="text-primary">REDENTOR</span>
              </h1>
              
              <p className="text-lg md:text-xl mb-16 text-gray-300 leading-relaxed max-w-2xl mx-auto font-light">
                {slide.description}
              </p>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black rounded-none px-12 py-4 text-base font-light uppercase tracking-[0.2em] transition-all duration-300"
              >
                {slide.button_text}
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-px h-16 bg-white/30">
          <div className="w-px h-4 bg-white/60 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

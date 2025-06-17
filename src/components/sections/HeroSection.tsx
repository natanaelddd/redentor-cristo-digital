
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
    },
    {
      id: '2',
      category: 'Comunidade',
      title: 'Faça Parte da Nossa Família',
      description: 'Conecte-se com Deus e com uma comunidade acolhedora que caminha junto na fé.',
      button_text: 'Junte-se a nós',
      order: 2,
      is_active: true
    }
  ];

  const slidesToUse = slides && slides.length > 0 ? slides : defaultSlides;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070&auto=format&fit=crop')`
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {slidesToUse.map((slide, index) => (
            <div key={slide.id} className={index === 0 ? "block" : "hidden"}>
              <p className="text-primary-200 text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-6 opacity-90">
                {slide.category}
              </p>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 font-heading leading-tight">
                {slide.title}
              </h1>
              
              <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed max-w-3xl mx-auto">
                {slide.description}
              </p>
              
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-xl"
              >
                {slide.button_text}
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1 h-3 bg-white/60 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

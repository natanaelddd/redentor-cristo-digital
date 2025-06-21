
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

type CarouselItemData = {
  id: string;
  category: string;
  title: string;
  description: string | null;
  button_text: string;
};

type SiteContent = {
  [key: string]: string | undefined;
};

interface HeroSectionProps {
  slides?: CarouselItemData[];
  siteContent?: SiteContent;
}

export const HeroSection = ({ slides = [], siteContent = {} }: HeroSectionProps) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
        return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
        setCurrent(api.selectedScrollSnap());
        });
    }, [api, slides]);

    // Dados padrão caso não haja slides
    const defaultSlides = [
      {
        id: '1',
        category: 'EVENTOS ESPECIAIS',
        title: 'CULTOS DE DOMINGO',
        description: 'Junte-se a nós todos os domingos às 19h para uma experiência de fé, adoração e palavra de Deus.',
        button_text: 'SAIBA MAIS'
      }
    ];

    const slidesToShow = slides.length > 0 ? slides : defaultSlides;

    return (
        <section
          id="#"
          className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white flex items-center justify-center overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          {/* Curved Shape Top */}
          <div className="absolute top-0 left-0 w-full h-32 bg-white">
            <svg className="absolute bottom-0 w-full h-32" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
              <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,0 Z" fill="url(#gradient1)"/>
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1"/>
                  <stop offset="50%" stopColor="#8b5cf6"/>
                  <stop offset="100%" stopColor="#ec4899"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="relative container mx-auto px-8 w-full flex items-center justify-center min-h-screen z-10">
            <Carousel setApi={setApi} className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {slidesToShow.map((item) => (
                  <CarouselItem key={item.id}>
                    <div className="p-8">
                      <div className="bg-white/10 backdrop-blur-md text-white p-16 rounded-3xl shadow-2xl border border-white/20 relative text-center overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-full opacity-20 translate-y-12 -translate-x-12"></div>
                        
                        <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-8 font-medium">{item.category}</p>
                        <h1 className="text-6xl md:text-7xl font-bold font-heading mb-10 leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">{item.title}</h1>
                        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">{item.description}</p>
                        
                        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-12 py-6 text-lg tracking-[0.1em] font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          {item.button_text}
                          <ArrowRight className="ml-3 h-5 w-5" />
                        </Button>
                        
                        {/* Navigation dots */}
                        <div className="flex justify-center gap-3 mt-12">
                          {Array.from({ length: count }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => api?.scrollTo(i)}
                              className={`h-3 w-3 rounded-full transition-all duration-300 ${current === i ? 'bg-white w-10 shadow-lg' : 'bg-white/40 hover:bg-white/60'}`}
                            >
                              <span className="sr-only">Slide {i + 1}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Custom Navigation Arrows */}
              <button 
                onClick={() => api?.scrollPrev()}
                className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 flex items-center justify-center shadow-lg transition-all duration-300 z-10 border border-white/20"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button 
                onClick={() => api?.scrollNext()}
                className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 flex items-center justify-center shadow-lg transition-all duration-300 z-10 border border-white/20"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </Carousel>
          </div>

          {/* Curved Shape Bottom */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg className="w-full h-32" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
              <path d="M0,120 C150,20 350,120 600,70 C850,20 1050,120 1200,70 L1200,120 Z" fill="white"/>
            </svg>
          </div>

          {/* Sunday Services Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md text-white py-6 px-8 flex justify-between items-center z-20 text-sm border-t border-white/10">
            <div className="flex items-center gap-8 uppercase font-medium tracking-wider">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">CULTOS DE DOMINGO</span>
              <div className="hidden md:flex items-center gap-8">
                  <span className="text-gray-400">|</span>
                  <span>19H</span>
                  <span className="text-gray-400">|</span>
                  <span>QUARTA - ESTUDO BÍBLICO - 20H</span>
                  <span className="text-gray-400">|</span>
                  <span>SEXTA - ORAÇÃO - 20H</span>
              </div>
              <span className="text-gray-400">|</span>
              <a href="#" className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                <span>ASSISTIR ONLINE</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Scrolling text */}
            <div className="flex-1 mx-8 overflow-hidden hidden lg:block">
              <div className="flex animate-marquee">
                <p className="whitespace-nowrap uppercase font-medium px-4 tracking-wider">
                  CONTRIBUA - AJUDE A IGREJA - FAÇA SUA DOAÇÃO - CONTRIBUA - AJUDE A IGREJA -&nbsp;
                </p>
                <p className="whitespace-nowrap uppercase font-medium px-4 tracking-wider" aria-hidden="true">
                  CONTRIBUA - AJUDE A IGREJA - FAÇA SUA DOAÇÃO - CONTRIBUA - AJUDE A IGREJA -&nbsp;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="#sobre" className="hidden lg:flex items-center gap-2 uppercase font-medium tracking-wider hover:text-purple-300 transition-colors">
                <span>Rolar para baixo</span>
                <ArrowDown className="h-4 w-4" />
              </a>
              <Button size="icon" className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 w-12 h-12 border-0 shadow-lg">
                <MessageCircle className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>
    );
};

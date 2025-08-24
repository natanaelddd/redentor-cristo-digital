
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

    // Array de imagens cristãs para o fundo dinâmico
    const backgroundImages = [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=3870&q=80", // igreja arquitetura
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=3870&q=80", // céu com nuvens
      "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=3869&q=80", // natureza montanha
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=3870&q=80"  // paisagem serena
    ];

    // Seleciona uma imagem aleatória a cada refresh da página
    const [selectedImage] = React.useState(() => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      return backgroundImages[randomIndex];
    });

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

    // Dados padrão para a Igreja Missionária Cristo Redentor
    const defaultSlides = [
      {
        id: "1",
        category: "BEM-VINDOS",
        title: "IGREJA MISSIONÁRIA CRISTO REDENTOR",
        description: "Uma comunidade de fé, esperança e amor no coração de Ribeirão Preto. Venha adorar conosco!",
        button_text: "CONHEÇA NOSSA IGREJA"
      }
    ];

    const slidesToShow = slides.length > 0 ? slides : defaultSlides;

    return (
        <section
          id="#"
          className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${selectedImage}')`
          }}
        >
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center min-h-screen z-10">
            <Carousel setApi={setApi} className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {slidesToShow.map((item) => (
                  <CarouselItem key={item.id}>
                    <div className="p-4 sm:p-6 lg:p-8">
                      <div className="bg-white/10 backdrop-blur-md text-white p-8 sm:p-12 lg:p-16 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 relative text-center overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-20 -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-blue-400 to-teal-400 rounded-full opacity-20 translate-y-10 -translate-x-10 sm:translate-y-12 sm:-translate-x-12"></div>
                        
                        <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/80 mb-6 sm:mb-8 font-medium">{item.category}</p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-8 sm:mb-10 leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">{item.title}</h1>
                        <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">{item.description}</p>
                        
                        <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 rounded-full px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg tracking-[0.1em] font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          {item.button_text}
                          <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                        
                        {/* Navigation dots */}
                        <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-12">
                          {Array.from({ length: count }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => api?.scrollTo(i)}
                              className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all duration-300 ${current === i ? 'bg-white w-6 sm:w-10 shadow-lg' : 'bg-white/40 hover:bg-white/60'}`}
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
              
              {/* Custom Navigation Arrows - Hidden on mobile */}
              <button 
                onClick={() => api?.scrollPrev()}
                className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 items-center justify-center shadow-lg transition-all duration-300 z-10 border border-white/20"
              >
                <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </button>
              <button 
                onClick={() => api?.scrollNext()}
                className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 items-center justify-center shadow-lg transition-all duration-300 z-10 border border-white/20"
              >
                <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </button>
            </Carousel>
          </div>

          {/* Curved Shape Bottom */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg className="w-full h-24 sm:h-32" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
              <path d="M0,120 C150,20 350,120 600,70 C850,20 1050,120 1200,70 L1200,120 Z" fill="white"/>
            </svg>
          </div>

          {/* Sunday Services Bar - Responsive */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md text-white py-4 sm:py-6 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center z-20 text-xs sm:text-sm border-t border-white/10 gap-4 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 uppercase font-medium tracking-wider text-center sm:text-left">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-bold text-sm sm:text-base">CULTOS DE DOMINGO</span>
              <div className="hidden md:flex items-center gap-8">
                  <span className="text-gray-400">|</span>
                  <span>19H</span>
                  <span className="text-gray-400">|</span>
                  <span>QUARTA - ESTUDO BÍBLICO - 20H</span>
                  <span className="text-gray-400">|</span>
                  <span>SEXTA - ORAÇÃO - 20H</span>
              </div>
              <div className="flex md:hidden items-center gap-4 text-xs">
                <span>DOM 19H</span>
                <span className="text-gray-400">|</span>
                <span>QUA 20H</span>
                <span className="text-gray-400">|</span>
                <span>SEX 20H</span>
              </div>
              <span className="hidden sm:inline text-gray-400">|</span>
              <a href="#" className="flex items-center gap-2 hover:text-orange-300 transition-colors text-xs sm:text-sm">
                <span>ASSISTIR ONLINE</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </div>

            {/* Scrolling text - Hidden on mobile */}
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
              <a href="#sobre" className="hidden lg:flex items-center gap-2 uppercase font-medium tracking-wider hover:text-orange-300 transition-colors">
                <span>Rolar para baixo</span>
                <ArrowDown className="h-4 w-4" />
              </a>
              <Button size="icon" className="rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 w-10 h-10 sm:w-12 sm:h-12 border-0 shadow-lg">
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </div>
          </div>
        </section>
    );
};

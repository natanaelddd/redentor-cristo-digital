
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
        description: 'Junte-se a nós todos os domingos para uma experiência de fé, adoração e palavra de Deus.',
        button_text: 'SAIBA MAIS'
      }
    ];

    const slidesToShow = slides.length > 0 ? slides : defaultSlides;

    return (
        <section
          id="#"
          className="relative h-screen bg-cover bg-center text-white flex items-center justify-center overflow-hidden"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative container mx-auto px-8 w-full flex items-center justify-center min-h-screen">
            <Carousel setApi={setApi} className="w-full max-w-2xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {slidesToShow.map((item) => (
                  <CarouselItem key={item.id}>
                    <div className="p-4">
                      <div className="bg-white text-black p-12 rounded-none shadow-2xl relative text-center">
                        <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">{item.category}</p>
                        <h1 className="text-5xl md:text-6xl font-bold font-heading mb-8 leading-tight">{item.title}</h1>
                        <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">{item.description}</p>
                        <Button size="lg" className="bg-black text-white hover:bg-gray-800 rounded-none px-10 py-4 text-sm tracking-[0.2em] font-medium">
                          {item.button_text}
                        </Button>
                        
                        {/* Navigation dots */}
                        <div className="flex justify-center gap-2 mt-8">
                          {Array.from({ length: count }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => api?.scrollTo(i)}
                              className={`h-2 w-2 rounded-full transition-all ${current === i ? 'bg-black w-8' : 'bg-gray-300'}`}
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
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all z-10"
              >
                <ChevronLeft className="h-6 w-6 text-black" />
              </button>
              <button 
                onClick={() => api?.scrollNext()}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all z-10"
              >
                <ChevronRight className="h-6 w-6 text-black" />
              </button>
            </Carousel>
          </div>

          {/* Sunday Services Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black text-white py-4 px-8 flex justify-between items-center z-20 text-sm">
            <div className="flex items-center gap-8 uppercase font-medium tracking-wider">
              <span>CULTOS DE DOMINGO</span>
              <div className="hidden md:flex items-center gap-8">
                  <span className="text-gray-400">|</span>
                  <span>9H</span>
                  <span className="text-gray-400">|</span>
                  <span>19H</span>
                  <span className="text-gray-400">|</span>
                  <span>ONLINE</span>
              </div>
              <span className="text-gray-400">|</span>
              <a href="#" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
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
              <a href="#sobre" className="hidden lg:flex items-center gap-2 uppercase font-medium tracking-wider hover:text-gray-300 transition-colors">
                <span>Rolar para baixo</span>
                <ArrowDown className="h-4 w-4" />
              </a>
              <Button size="icon" className="rounded-full bg-white text-black hover:bg-gray-200 w-12 h-12">
                <MessageCircle className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>
    );
};
